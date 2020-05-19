import { Component, OnInit, TemplateRef} from '@angular/core';
import { LocalDataSource, Cell } from 'ng2-smart-table';
import { SellMedicineControllerService, MedicineControllerService, MedicineDto, SellOrderDto, CustomerDto, CustomerControllerService } from '../../../../typescript-angular-client';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './../dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ToastrService } from '../../sharedmodule/toast';
import { InvoiceRow, InvoiceComponent } from './../invoice/invoice.component';
import { Logger } from '../../../log.service';
import { GenerateFileName } from '../../../common/genfilename';
import { AuthService } from '../../../service/auth-service.service';
import { TablesModule } from '../../tables/tables.module';
import { AppUtils } from '../../../common/utils/AppUtils';
import { parseNumber } from '@progress/kendo-angular-intl';
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
    this.log.log(">>>gen money")
    
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
        stt: {
          title: 'Stt',
          type: 'number',
          editable: false,
          addable: false,
          filter: false,
          sort:'desc'
        },
        medicineCode: {
          class: 'dangntClass',
          title: 'Mã thuốc',
          type: 'html',
          filter: false,
          editor: {
            type: 'list',
            config: {
              list: this.listMedicineDislay
            }
          },
          valuePrepareFunction:(data,row, cell)=>{
            return '<span onchange="changeMedicine($event)" class ="dangnt">'+data+'</span>'},
        },
        medicineName: {
          title: 'Tên sản phẩm',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
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
        
        // medicinePrice: {
        //   title: "Đơn giá hiện tại",
        //   type: 'number',
        //   editable: false,
        //   addable: false,
        //   filter: false,
        //   valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        // },
        // addMore: {
        //   title: 'Tính phí',
        //   type: 'number',
        //   filter: false,
        //   defaultValue: 0,
        //   show:false, 
        //   valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        // },
        realSellPrice: {
          title: 'Giá bán', 
          type: 'number',
          filter: false,
          defaultValue: 0,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        },
        total: {
          title: 'Thành tiền',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
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
        e.realSellPrice = medicine.realSellPrice;
        e.total = this.calculateTotalWithAddmore(e.realSellPrice, e.medicinePrice, e.amount);

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
    let sellOrderDto = { customer: null, id: null, listMedicines: [], time: null, total: 0, seller: this.authService.getUserName(), note:'',numberOfSell:'',timeInputAnimal:null };
    sellOrderDto.numberOfSell = this.sellOrder.numberOfSell;
    sellOrderDto.timeInputAnimal = this.sellOrder.timeInputAnimal;
    sellOrderDto.note = this.sellOrder.note;
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
            boughtPrice:null,
            priceForCompany: e.medicinePrice,
            priceForFarm: e.medicinePrice,
            priceForPersonal: e.medicinePrice,
            total: e.total,
            // Neu khong nhap gia ban moi thi mac dinh gia ban moi bang giaban cu
            realSellPrice: AppUtils.isEmptyOrZero(e.realSellPrice) ? e.medicinePrice : e.realSellPrice,
            expiryDate:"",
            discount:e.discount,
            boughtPriceAfterDiscount:e.boughtPriceAfterDiscount
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
            if(error.error){
              // this.toastService.notify(4, "Không thành công!", error.error);
            }else{
              this.log.log("Không co sthoong tin error.error");
              this.log.log(error);
              // this.toastService.notify(4, "Không thành công!", error);
            }
            
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
      //  console.log(event.data);
       console.log(event);
       this.source.getAll().then(data=>{
         for(let i = event.data.stt - 1 ; i <data.length;i++){
          data[i].stt -= 1;
         }
       });
       this.source.refresh();
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
  customer: CustomerDto = { id: null, name: 'Công ty Cổ Phần Nông Trại E.MOSS', phoneNumber: '', type: 'other',typeOfCustomer:'' };
  sellOrder:SellOrderDto={ customer: null, id: null, listMedicines: [], time: null, total: 0, seller: this.authService.getUserName(), note:'',numberOfSell:'',timeInputAnimal:null };
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
    //when create new and no edit realSellPrice update old realSellPrice
    if (isCreateNew && AppUtils.isEmpty(newData.realSellPrice)) {
      newData.realSellPrice = medicine.realSellPrice;
    }

    // Update Stt increase 1
    if(isCreateNew){
      newData.stt = 1;
      this.source.getAll().then(data=>{ 
        console.log(data);
        data.forEach(element => {
          element.stt = element.stt + 1;
        });
        
      });
     
    }

    //calculate total:
    newData.total = this.calculateTotalWithAddmore(newData.realSellPrice, newData.medicinePrice, newData.amount);
    newData.medicineUnit = medicine.unit;
    return newData;
  }
  
  private calculateTotalWithAddmore(realSellPrice, medicinePrice, amount): string {
    this.log.log("Calculate total processing...");
    let total = '';
    if (!AppUtils.isEmptyOrZero(realSellPrice)) {
      this.log.log('new Sell Price: ' + realSellPrice);
      // this.log.log(newData.medicinePrice);
      total = (parseInt(realSellPrice) * amount).toString();
    }
    else {
      this.log.log('Sell with normal price: ');
      // total = ((parseInt(medicinePrice)) * amount).toString();
      //TODO Don't use default price
      total='0';
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
        let total = 0;
        elements.forEach(element => {
          let name: string = element.medicineName;
          // //Dont use default price. only use realSellPrice
          let price: number = AppUtils.isEmpty(element.realSellPrice) ? 0 : element.realSellPrice * 1000;
          // let price : number = parseInt(element.realSellPrice)*1000;
          let amount: number = element.amount;
          let unit: string = element.medicineUnit;
          temp.push(new InvoiceRow(element.stt, name, price, amount, unit));
          total += (element.realSellPrice*amount);
        });
        this.buildSotienBangChu();
      } else {
        temp = initInvoiceData;
      }
    });
    this.dataInvoiceRow = temp;
  }
  resetData() {
    this.log.log('Reset lại data');
    this.customer = {};
    this.sellOrder={ customer: null, id: null, listMedicines: [], time: null, total: 0, seller: this.authService.getUserName(), note:'',numberOfSell:'',timeInputAnimal:null };
    this.source.load([]);
    this.resultCreate = false;
    this.dataInvoiceRow= initInvoiceData;
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
        valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
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
  public dataInvoiceRow: InvoiceRow[] = initInvoiceData;
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
      }
      else{
        this.customer.id=null;
      }
      this.changeEmossCheckbox(this.customer.name);
    },error=>{this.customer.id=null;});
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
      }else{
        this.customer.id=null;
      }
      this.changeEmossCheckbox(this.customer.name);
    },error=>{this.customer.id=null;});
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
  changeMedicine(event){
    console.log(event);
    console.log(">>>>> onchange cell");
  }
  sotienbangchu:string= "..............";
  buildSotienBangChu(){
    let total:number = 0;
    this.source.getAll().then(data=>{
      data.forEach(element => {
        total+=parseNumber(element.total);
      });
      console.log(">>> tong tien : "+total);
      this.sellMedicineControllerService.genMoneyUsingGET(total+"").subscribe(data=>{
        this.sotienbangchu=data[0];
      })
    });
  }
}

export const initInvoiceData = [
  new InvoiceRow(1, "", 0, 0, ""),
];

