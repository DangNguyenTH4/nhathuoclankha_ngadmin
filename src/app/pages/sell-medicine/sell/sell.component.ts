import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { SellMedicineControllerService, MedicineControllerService, MedicineDto, SellOrderDto, CustomerDto, CustomerControllerService } from '../../../../typescript-angular-client';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './../dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ToastrService } from '../../sharedmodule/toast';
import * as jsPDF from 'jspdf';
import { InvoiceRow, InvoiceComponent } from './../invoice/invoice.component';
import { color } from 'd3-color';
import { isEmpty } from 'rxjs/operators';
import { Logger } from '../../../log.service';
import { GenerateFileName } from '../../../common/genfilename';
import { AuthService } from '../../../service/auth-service.service';
import { TablesModule } from '../../tables/tables.module';
const EMOSSCOMPANY = "Công ty Cổ Phần Nông Trại E.MOSS";
const PHONE = "PHONE";
const NAME = "NAME_";

@Component({
  selector: 'ngx-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
  providers: [
    TablesModule,
    SellMedicineControllerService,
    MedicineControllerService, NbDialogService,
    DialogNamePromptComponent,
    ToastrService,
    InvoiceComponent,
    Logger,
    CustomerControllerService
  ]
})
export class SellComponent implements OnInit {

  ngOnInit() {

  }
  constructor(
    private log: Logger,
    private sellMedicineControllerService: SellMedicineControllerService,
    private medicineControllerService: MedicineControllerService
    , private dialogService: NbDialogService
    , private toastService: ToastrService,
    private customerControllerService: CustomerControllerService,
    private authService: AuthService
  ) {
    this.prePareListMedicineDisplay();
    this.loadListPhoneCustomer();
    this.loadListNameCustomer();
  }
  private prePareListMedicineDisplay() {
    //get all medicine
    this.medicineControllerService.getListAllMedicine().subscribe(data => {
      this.listSourceMedicines = data;
      this.listSourceMedicines.forEach(element => {
        this.listMedicineDislay.push({ value: element.code, title: element.name });
      });
      this.settings = this.loadTableSetting();
    },
      error => {
        this.settings = this.loadTableSetting();
      }
    );
  }
  listMedicineDislay = [];
  listSourceMedicines: MedicineDto[] = [];
  settings: Object;
  loadTableSetting() {
    this.log.log("LOad table settting....");
    return {
      action: {
        add: true,
        edit: true,
        delete: true,
        position: 'left',
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {

        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        medicineCode: {
          title: 'Mã sản phẩm',
          type: 'string',
          filter: false,
          editor: {
            type: 'list',
            config: {
              list: this.listMedicineDislay
            }
          }
        },
        amount: {
          title: 'Số lượng',
          type: 'number',
          filter: false,
        },
        medicineUnit: {
          title: 'Đơn vị',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
        },
        medicineName: {
          title: 'Tên sản phẩm',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
        },
        medicinePrice: {
          title: "Đơn giá",
          type: 'number',
          editable: false,
          addable: false,
          filter: false,
          valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000) }
        },
        addMore: {
          title: 'Tính phí',
          type: 'number',
          filter: false,
          defaultValue: 0,
          valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000) }
        },
        total: {
          title: 'Thành tiền',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
          valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000) }
        },

      },
    };
  }
  selectType(event) {
    // this.type = event.value
    this.customer.type = event;
    this.source.getAll().then(data => {
      data.forEach(e => {
        let medicine = this.listSourceMedicines.find(m => m.code === e.medicineCode);
        if (this.customer.type === 'company') {
          e.medicinePrice = medicine.priceForCompany;
        } else if (this.customer.type === 'farm') {
          e.medicinePrice = medicine.priceForFarm;
        } else {
          e.medicinePrice = medicine.priceForPersonal;
        }
        e.addMore = medicine.addMore;
        e.total = this.calculateTotalWithAddmore(e.addMore, e.medicinePrice, e.amount);

      });
      this.source.load(data);
      this.loadDataForInvoice();
    });
  }
  source: LocalDataSource = new LocalDataSource();
  notifyBeforeCreate(dialog: TemplateRef<any>) {
    let message = this.validateWhenCreateOrder();
    if (message !== "ok") {
      this.notify(message);
      return;
    }
    this.dialogService.open(dialog);
  }
  async createOrder(pdf) {
    this.log.log('Create new order....');
    let sellOrderDto: SellOrderDto = { customer: null, id: null, listMedicines: [], time: null, total: 0, seller: this.authService.getUserName() };
    sellOrderDto.customer = this.customer;
    let tempTotal: number = 0;
    this.log.log('Build body sellDto..');
    let result = await this.source.getAll().then(
      data => {
        data.forEach(e => {
          sellOrderDto.listMedicines.push({
            amount: e.amount,
            code: e.medicineCode,
            name: e.medicineName,
            unit: e.medicineUnit,
            priceForCompany: e.medicinePrice,
            priceForFarm: e.medicinePrice,
            priceForPersonal: e.medicinePrice,
            total: e.total,
            addMore: e.addMore
          });
          tempTotal += e.total;
        });
        sellOrderDto.total = tempTotal;
        this.log.log('send request....');
        this.sellMedicineControllerService.createSellOrderUsingPOST(sellOrderDto).subscribe(
          data => {
            this.resultCreate = true;
            this.log.log('Tạo thành công -- Set result create = true: ' + this.resultCreate);
            this.toastService.notify(1, "Thành công!", "Tạo order thành công!");
            this.log.log('Sau khi create order: ' + this.resultCreate);
            if (this.resultCreate) {
              if (pdf) {
                this.log.log('Tạo order thành công--> In file pdf');
                let fileName = GenerateFileName.genfileName(this.customer.name) + '.pdf';
                pdf.saveAs(fileName);

              }
              this.resetData();
            }
          }, error => {
            this.resultCreate = false;
            this.log.log(error.error);
            this.toastService.notify(4, "Không thành công!", error.error);
            this.log.log('Tạo không thành công -- Set result create = false');

          }
        );

      }, error => { });
    return result;
  }

  async deleteMedicineItem(event): Promise<any> {
    await event.confirm.resolve();
    return 'ok';
  }
  onDeleteConfirm(event): void {
    this.deleteMedicineItem(event).then(data => {
      this.loadDataForInvoice();
    });
  }
  onCreateConfirm(event) {
    this.editOrCreateNewMedicine(event, true).then(temp => {
      if (temp) {
        this.loadDataForInvoice();
      }
    });
  }
  onEditConfirm(event) {
    this.editOrCreateNewMedicine(event, false).then(temp => {
      if (temp) {
        this.loadDataForInvoice();
      }
    });
  }
  async editOrCreateNewMedicine(event, isCreateNew: boolean) {
    let validateMessage = await this.validateRow(event.newData, isCreateNew);
    if (validateMessage === "ok") {
      event.newData = this.updateInfoRow(event.newData, isCreateNew);
      await event.confirm.resolve(event.newData);
      return event;

    } else {
      event.confirm.reject();
      this.notify(validateMessage);
      return null;;
    }
  }
  isEmoss: boolean = true;
  autoCheckDate: boolean = true;
  customer: CustomerDto = { id: null, name: 'Công ty Cổ Phần Nông Trại E.MOSS', phoneNumber: '', type: 'other' };
  private updateInfoRow(newData: any, isCreateNew: boolean) {
    let medicine = this.listSourceMedicines.find(e => e.code == newData.medicineCode);
    newData.medicineName = medicine.name;
    if (this.customer.type === 'company') {
      newData.medicinePrice = medicine.priceForCompany;
    } else if (this.customer.type === 'farm') {
      newData.medicinePrice = medicine.priceForFarm;
    } else {
      newData.medicinePrice = medicine.priceForPersonal;
    }
    //when create new and no edit addmore update old addmore
    if (isCreateNew && this.isEmpty(newData.addMore)) {
      newData.addMore = medicine.addMore;
    }

    //calculate total:
    newData.total = this.calculateTotalWithAddmore(newData.addMore, newData.medicinePrice, newData.amount);
    newData.medicineUnit = medicine.unit;
    return newData;
  }
  private isEmpty(something: any): boolean {
    return something === null || something === '';
  }
  private calculateTotalWithAddmore(addMore, medicinePrice, amount): string {
    this.log.log("Calculate total processing...");
    let total = '';
    if (addMore != null && addMore !== '') {
      this.log.log('new add more have: ' + addMore);
      // this.log.log(newData.medicinePrice);
      this.log.log(medicinePrice + parseInt(addMore));
      total = ((parseInt(medicinePrice) + parseInt(addMore)) * amount).toString();
    }
    else {
      this.log.log('non add more have: ' + addMore);
      total = ((parseInt(medicinePrice)) * amount).toString();
    }
    return total;
  }
  // Khi nhập đơn hàng xong mới nhập số điện thoại => cần update lại phần add more
  private updateInfoRowWithFromOldBought(newData: any) {
    let medicine = this.listSourceMedicines.find(e => e.code == newData.medicineCode);
    newData.medicineName = medicine.name;
    if (this.customer.type === 'company') {
      newData.medicinePrice = medicine.priceForCompany;
    } else if (this.customer.type === 'farm') {
      newData.medicinePrice = medicine.priceForFarm;
    } else {
      newData.medicinePrice = medicine.priceForPersonal;
    }
    newData.medicineUnit = medicine.unit;
    newData.total = (newData.medicinePrice * newData.amount).toString();

    return newData;
  }
  async checkMedicineExisting(medicineCode) {
    let temp = false;
    this.log.log(medicineCode);
    let temp2 = await this.source.getAll().then(data => {
      data.forEach(e => {
        if (e.medicineCode === medicineCode) {
          temp = true;
        }
      });
    });
    return temp;
  }
  private async validateRow(newData: any, isCreateNew: boolean): Promise<string> {
    let result = "ok";
    if (newData) {
      let isExsit = false;
      if (isCreateNew) {
        isExsit = await this.checkMedicineExisting(newData.medicineCode);
      }
      if (newData.medicineCode === '') {
        result = 'Chưa chọn loại thuốc!';
      } else if (!newData.amount.match(/^\d+$/) && !newData.amount.match(/^\d+\.\d+$/)) {
        result = "Số lượng không đúng!";
      }
      else if (newData.amount <= 0) {
        result = 'Số lượng cần phải > 0!'
      } else if (isExsit) {
        result = 'Loại thuốc này đã có trong hóa đơn!'
      }
    }
    else {
      result = "Chưa điền đủ thông tin!"
    }

    return result;
  }
  private validateWhenCreateOrder() {
    let result = "ok";
    let length = this.source.count();
    if (length === 0) {
      result = "Đơn hàng trống!";
    }
    return result;
  }
  private notify(message: string) {
    this.dialogService.open(DialogNamePromptComponent, {
      context: {
        message: message
      },
    });
  }
  loadDataForInvoice() {
    let temp: InvoiceRow[] = [];
    this.dataInvoiceRow = [];
    this.source.getAll().then(elements => {
      //Get price
      if (elements && elements.length !== 0) {
        elements.forEach(element => {
          let name: string = element.medicineName;
          let price: number = (element.medicinePrice)* 1000;
          let amount: number = element.amount;
          let unit: string = element.medicineUnit;
          let addMore: number = element.addMore * 1000;
          temp.push(new InvoiceRow(name, price, addMore, amount, unit));
        });
      } else {
        temp.push(new InvoiceRow("", 0, 0, 0, ""));
      }
    });
    this.dataInvoiceRow = temp;
  }
  resetData() {
    this.log.log('Reset lại data');
    this.customer = {};
    this.source.load([]);
    this.resultCreate = false;
  }

  confirmCreateSetting = {
    hideSubHeader: true,
    hideHeader: true,
    add: {
      addButtonContent: '',
      createButtonContent: '',
      cancelButtonContent: '',
      confirmCreate: false,
    },
    edit: {
      editButtonContent: '',
      saveButtonContent: '',
      cancelButtonContent: '',
      confirmSave: false,
    },
    delete: {

      deleteButtonContent: '',
      confirmDelete: false,
    },
    columns: {
      medicineCode: {
        title: 'Mã thuốc',
        editable: false,
        addable: false,
        filter: false,

      },
      amount: {
        title: 'Số lượng',
        editable: false,
        addable: false,
        filter: false,
      },
      medicineUnit: {
        title: 'Đơn vị',
        type: 'text',
        editable: false,
        addable: false,
        filter: false,
      },
      // medicineName: {
      //   title: 'Tên thuốc',
      //   type: 'text',
      //   editable: false,
      //   addable: false,
      //   filter: false,
      // },
      // medicinePrice: {
      //   title: "Giá tiền",
      //   type: 'number',
      //   editable: false,
      //   addable: false,
      //   filter: false,
      // },
      total: {
        title: 'Thành tiền',
        type: 'text',
        editable: false,
        addable: false,
        filter: false,
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000) }
      },

    },
  };
  resultCreate = false;
  async printPdf(pdf) {
    this.resultCreate = false;
    let resultValidate = '';
    this.log.log('Validate When create order');
    resultValidate = await this.validateWhenCreateOrder();
    if (resultValidate === 'ok') {
      await this.createOrder(pdf);

    }
    else {
      this.notify(resultValidate);
    }
  }
  changeTypePrint(even) {
    this.paperSize = even;
    this.log.log(even);
  }
  public dataInvoiceRow: InvoiceRow[] = invoiceData;
  paperSize = 'A5';
  listPhone: string[] = [];
  listName: string[] = [];

  private loadListPhoneCustomer() {

    this.customerControllerService.getListPhone('').subscribe(data => {
      this.listPhone = data;
      this.log.logAny(this.listPhone);
    });
  }
  private loadListNameCustomer() {
    this.customerControllerService.getListName('').subscribe(data => {
      this.listName = data;
      this.log.logAny(this.listName);
    });
  }
  //Khi người dùng nhập số điện thoại xong => update thông tin của người dùng nếu tồn tại
  changePhone() {
    this.log.log("Change phone");
    this.customerControllerService.getCustomerByPhone2UsingGET(PHONE + this.customer.phoneNumber).subscribe(data => {
      this.log.logAny(data);
      if (data) {
        this.customer = data;
        this.changeEmossCheckbox(this.customer.name);
      }
    });
    this.customerControllerService.getListBougthByPhoneUsingGet(PHONE + this.customer.phoneNumber).subscribe(data => {
      if (data) {
        this.log.logAny(data);
        this.listSourceMedicines = data;
        this.log.logAny(this.listSourceMedicines);
      }
      //update current price with current customer type
      this.selectType(this.customer.type);
      //load new listSourceMedicine 

      this.loadTableSetting();
    });
  }
  changeName() {
    this.log.log("Change name log");
    //Add prefix : NAME_ for server know find by name
    this.customerControllerService.getCustomerByPhone2UsingGET(NAME + this.customer.name).subscribe(data => {
      this.log.logAny(data);
      if (data) {
        this.customer = data;
        this.changeEmossCheckbox(this.customer.name);
      }
    });
    this.customerControllerService.getListBougthByPhoneUsingGet(NAME + this.customer.name).subscribe(data => {
      if (data) {
        this.log.logAny(data);
        this.listSourceMedicines = data;
        this.log.logAny(this.listSourceMedicines);
      }
      //update current price with current customer type
      this.selectType(this.customer.type);
      //load new listSourceMedicine 

      this.loadTableSetting();
    });

  }
  changeToEmossCompany() {
    this.log.log(this.isEmoss + "");
    if (this.isEmoss) {
      this.customer.name = EMOSSCOMPANY;
    } else {
      this.customer.name = "";
    }
    this.changeName();
  }
  changeEmossCheckbox(comName: string) {
    if (comName === EMOSSCOMPANY) {
      this.isEmoss = true;
      return;
    }
    this.isEmoss = false;
  }

  // seeInvoice() {
  //   this.sellMedicineControllerService.reportMyHistorySellGET(this.authService.getUserName()).subscribe(bdata=>{
  //     console.log(bdata);
  //     // this.source.load(bdata[0].listMedicines);
  //     this.dialogService.open(InvoiceComponent,
  //       {
  //         context: {data:this.dataInvoiceRow,autoCheckDate:this.autoCheckDate,isEmoss:this.isEmoss,customer:this.customer},
  //         hasBackdrop: false, 
  //       });
  //   });
  // }


}
export const invoiceData = [
  new InvoiceRow("", 0, 0, 0, ""),
];

