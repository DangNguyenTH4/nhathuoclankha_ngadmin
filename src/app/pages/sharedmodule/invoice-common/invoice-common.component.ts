import { Component, OnInit, ViewChild, ElementRef, Injectable, Input } from '@angular/core';
import { aggregateBy } from '@progress/kendo-data-query';
import { CustomerDto } from '../../../../typescript-angular-client';
import { Logger } from '../../../log.service';

@Component({
  selector: 'ngx-invoice-common',
  templateUrl: './invoice-common.component.html',
  styleUrls: ['./invoice-common.component.scss']
})
export class InvoiceCommonComponent implements OnInit {
  constructor() {

  }
  ngOnInit(): void {
  }
  @Input()
  autoCheckDate:boolean=true;
  @Input()
  customer : CustomerDto={name:'Không tên'};
  @Input() 
  isEmoss:boolean=true;
  @Input()
  dungThuoc:string='dung thuoc';
  @Input()
  public data: InvoiceRow[] = [];

  private aggregates: any[] = [{
    field: 'qty', aggregate: 'sum'
  }, {
    field: 'total', aggregate: 'sum'
  }];
  public get fillDate():string{
    let homnay:string = 'Ngày';
    
    let date = new Date();

    let ngay = 'Ngày '+ date.getDate();
    let thang= ' ,Tháng '+(date.getMonth()+1);
    let nam = ' ,Năm '+date.getFullYear();
    homnay=ngay+thang+nam ;
    return homnay;
  }
  public get totals(): any {
    return aggregateBy(this.data, this.aggregates) || {};
  }
  public get computeTotal(){
    let a = 0;
    this.data.forEach(e=>{
      a=a+e.qty*(e.unitPrice+e.addMore);
    });
    return a.toLocaleString('vi-vn');
  }
  public get getUnitPrice(){
    return 
  }

}
export class InvoiceRow {
  public get formatNumber(){
    let a = (this.unitPrice+ this.addMore).toLocaleString('vi-vn');
    return a;
  }
  public get formatTotalNumber(){
    let a = (this.unitPrice+this.addMore)*this.qty;
    return a.toLocaleString('vi-vn');
  }
  public get total(): number {
    return (this.unitPrice+this.addMore) * this.qty;
  }
  public get amountColumn(): string {
    let result = '';
    result = this.qty + ' ' + this.unit;
    return result;
  }

  constructor(
    public productName: string,
    public unitPrice: number,
    public addMore:number,
    public qty: number,
    public unit: string,
  ) { }
}