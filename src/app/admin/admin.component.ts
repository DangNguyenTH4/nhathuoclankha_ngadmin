import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../pages/sharedmodule/toast';
import { Logger } from '../log.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(private log:Logger) { }
  source: LocalDataSource = new LocalDataSource();
  ngOnInit() {
  }
  public doNothing(){
    this.log.log("Khong the click");
  }
  viewSetting = {
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
