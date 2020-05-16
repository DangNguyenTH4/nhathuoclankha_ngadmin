import { Component, OnInit, TemplateRef } from '@angular/core';
import { TablesComponent } from '../tables/tables.component';
import { TablesModule } from '../tables/tables.module';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import {  MedicineControllerService, MedicineDto, CustomerDto, ImportMedicineControllerService } from '../../../typescript-angular-client';
import { NbDialogService } from '@nebular/theme';
import { ImportOrderDto } from '../../../typescript-angular-client/model/importOrderDto';
import { ToastrService } from '../sharedmodule/toast';
import { Logger } from '../../log.service';
import { AppUtils } from '../../common/utils/AppUtils';

@Component({
  selector: 'ngx-import-medicine',
  templateUrl: './import-medicine.component.html',
  styleUrls: ['./import-medicine.component.scss'],
  providers: [
    TablesModule,
    MedicineControllerService, NbDialogService,ToastrService
  ]
})

export class ImportMedicineComponent implements OnInit {
  ngOnInit() {

  }
  constructor(
    private log:Logger,
    private importMedicineControllerService: ImportMedicineControllerService,
    private medicineControllerService: MedicineControllerService
    , private dialogService: NbDialogService,
    private toastService:ToastrService,
  ) {
    this.prePareListMedicineDisplay();
    // this.source.setSort(this.source.getAll().then(data-)
  }
  private prePareListMedicineDisplay() {
    this.medicineControllerService.getListAllMedicine().subscribe(data => {
      this.listMedicines = data;
      this.listMedicines.forEach(element => {
        this.listMedicineDislay.push({ value: element.code, title: element.name })
      });
      this.settings = this.loadTableSetting();
    },
      error => { this.settings = this.loadTableSetting(); }
    );
  }
  listMedicineDislay = [];
  listMedicines: MedicineDto[] = [];
  settings: Object;
  loadTableSetting() {
    return {
      action: {
        add: true,
        edit: true,
        delete: true,
        position: 'left',
        // custom: [
        //   { name: 'requeue', title: '<i class="fa fa-arrow-circle-left mr-2"></i>' },
        //   { name: 'reprepare', title: '<i class="fa fa-arrow-circle-o-left mr-2"></i>' },
        //   { name: 'clean_logs', title: '<i class="fa fa-trash-o mr-2"></i>' }
        // ]
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
        stt :{
          title: 'STT',
          type: 'number',
          editable: false,
          addable: false,
          filter: false,
          sorter : true
        },
        medicineCode: {
          title: 'Mã thuốc',
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
        boughtPrice: {
          title: 'Giá nhập',
          type: 'text',
          filter: false,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        },
        total: {
          title: 'Tổng tiền nhập',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        },
        expiryDate: {
          title: 'Hạn sử dụng',
          type: 'text',
          filter: false,
        },
        priceForCompany: {
          title: 'Giá bán cho công ty',
          type: 'text',
          filter: false,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        },
        priceForFarm: {
          title: 'Giá bán cho nông trại',
          type: 'text',
          filter: false,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        },
        priceForPersonal: {
          title: 'Giá bán lẻ',
          type: 'text',
          filter: false,
          valuePrepareFunction: (value) => { return AppUtils.appendVND(value); }
        },
        medicineName: {
          title: 'Tên thuốc',
          type: 'text',
          editable: false,
          addable: false,
          filter: false,
        },
      },
    };
  }
  selectType(event) {
    // this.type = event.value
    this.customer.type = event;
    this.source.getAll().then(data => {
      data.forEach(e => {
        let medicine = this.listMedicines.find(m => m.code === e.medicineCode);
        if (this.customer.type === 'company') {
          e.medicinePrice = medicine.priceForCompany;
        } else if (this.customer.type === 'farm') {
          e.medicinePrice = medicine.priceForFarm;
        } else {
          e.medicinePrice = medicine.priceForPersonal;
        }

        e.total = e.amount * e.medicinePrice;
      });
      this.source.load(data);
    });
  }
  source: LocalDataSource = new LocalDataSource();
  notifyBeforeCreate(dialog: TemplateRef<any>) {
    this.log.log(this.date.toISOString());
    let message = this.validateWhenCreateOrder();
    if (message !== "ok") {
      // this.notify(message);
      this.toastService.notify(4,"Lỗi",message);
      return;
    }
    this.dialogService.open(dialog).onClose.subscribe(isOke=>
      {
        if(isOke) 
          this.createOrder();    
      });
  }
  date:Date=new Date();
  createOrder() {
    
    let importOrderDto: ImportOrderDto = { id: null,importDate:this.date,listMedicineImport:[],staffName:'dangnt'};
    this.source.getAll().then(
      data => {
        if(data.length===0){
          this.toastService.notify(4,"Lỗi","Chưa có thuốc nào được nhập!");
          return ;
        }
        //Map data from datasource to Dto
        data.forEach(e => {
          importOrderDto.listMedicineImport.push({
            amount: e.amount,
            code: e.medicineCode,
            name: e.medicineName,
            unit: e.medicineUnit,
            boughtPrice:e.boughtPrice,
            priceForCompany: e.priceForCompany,
            priceForFarm: e.priceForFarm,
            priceForPersonal: e.priceForPersonal,
            total: e.total,
            addMore:0,
            expiryDate:e.expiryDate
          });
        });
      this.importMedicineControllerService.createImportOrder(importOrderDto).subscribe(
        data=>{
          this.resetData();
          this.toastService.notify(1,"Thành công","Thêm thành công!");
        },
        error=>{
          this.toastService.notify(4,"Lỗi",error.error.message);
        });
      });
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  data: Array<any> = [{}];
  onCreateConfirm(event) {
    console.log(event);
    
   
    console.log(event);
    this.editOrCreateNewMedicine(event, true);
  }
  onEditConfirm(event) {
    this.editOrCreateNewMedicine(event, false);

  }
  editOrCreateNewMedicine(event, isCreateNew:boolean) {
    let validateMessage = this.validateRow(event.newData);
    if (validateMessage === "ok") {
      event.newData = this.updateInfoRow(event.newData, isCreateNew);
      event.confirm.resolve(event.newData);
      
    } else {
      event.confirm.reject();
      this.notify(validateMessage);

    }
  }

  customer: CustomerDto = { id: null, name: '', phoneNumber: '', type: 'other' };
  private updateInfoRow(newData: any, isCreateNew: boolean) {
    let medicine = this.listMedicines.find(e => e.code == newData.medicineCode);
    newData.medicineName = medicine.name;
    newData.medicineUnit = medicine.unit;
    newData.total = (newData.boughtPrice * newData.amount).toString();
    if(isCreateNew){
      this.source.getAll().then(data =>{newData.stt = data.length + 1;});
    }
    return newData;

  }
  private validateRow(newData: any): string {
    let result = "ok";
    if (newData) {
      if (newData.medicineCode === '') {
        result = 'Chưa chọn loại thuốc!';
      } else if (!newData.amount.match(/^\d+$/) && !newData.amount.match(/^\d+\.\d+$/)) {
        result = "Số lượng không đúng!";
      }
      else if (newData.amount <= 0) {
        result = 'Số lượng cần phải > 0!'
      }
    } else {
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
    // this.dialogService.open(DialogNamePromptComponent, {
    //   context: {
    //     message: message
    //   },
    // });
    alert(message);
  }
  private resetData(){
    this.customer={};
    this.source.load([]);
  }

  // confirmCreateSetting = {
  //   hideSubHeader: true,
  //   hideHeader: true,
  //   add: {
  //     addButtonContent: '',
  //     createButtonContent: '',
  //     cancelButtonContent: '',
  //     confirmCreate: false,
  //   },
  //   edit: {
  //     editButtonContent: '',
  //     saveButtonContent: '',
  //     cancelButtonContent: '',
  //     confirmSave: false,
  //   },
  //   delete: {

  //     deleteButtonContent: '',
  //     confirmDelete: false,
  //   },
  //   columns: {
  //     medicineCode: {
  //       title: 'Mã thuốc',
  //       editable: false,
  //       addable: false,
  //       filter: false,

  //     },
  //     amount: {
  //       title: 'Số lượng',
  //       editable: false,
  //       addable: false,
  //       filter: false,
  //     },
  //     medicineUnit: {
  //       title: 'Đơn vị',
  //       type: 'text',
  //       editable: false,
  //       addable: false,
  //       filter: false,
  //     },
  //     // medicineName: {
  //     //   title: 'Tên thuốc',
  //     //   type: 'text',
  //     //   editable: false,
  //     //   addable: false,
  //     //   filter: false,
  //     // },
  //     // medicinePrice: {
  //     //   title: "Giá tiền",
  //     //   type: 'number',
  //     //   editable: false,
  //     //   addable: false,
  //     //   filter: false,
  //     // },
  //     total: {
  //       title: 'Thành tiền',
  //       type: 'text',
  //       editable: false,
  //       addable: false,
  //       filter: false,
  //     },

  //   },
  // };
}

