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
  autoCheckDate: boolean = true;
  @Input()
  customer: CustomerDto = { name: 'Không tên' };
  @Input()
  isEmoss: boolean = true;
  @Input()
  dungThuoc: string = 'dung thuoc';
  @Input()
  public data: InvoiceRow[] = [];
  /**
   * dd/MM/yyyy
   */
  @Input()
  sellDate: String;

  private aggregates: any[] = [{
    field: 'qty', aggregate: 'sum'
  }, {
    field: 'total', aggregate: 'sum'
  }];
  public get fillDate(): string {
    let homnay: string = 'Ngày';
    let ngay = 'Ngày ';
    let thang = ' ,Tháng ';
    let nam = ' ,Năm ';
    if (this.sellDate) {
      let date = this.sellDate.split('/');
      ngay += date[0];
      thang += date[1];
      nam += date[2];
    } else {
      let date = new Date();
      ngay += date.getDate();
      thang += (date.getMonth() + 1);
      nam += date.getFullYear();
    }
    homnay = ngay + thang + nam;
    return homnay;
  }
  public get totals(): any {
    return aggregateBy(this.data, this.aggregates) || {};
  }
  public get computeTotal() {
    let a = 0;
    this.data.forEach(e => {
      a = a + e.qty * (e.unitPrice);
    });
    return (a*1000).toLocaleString('vi-vn');
  }
  public get getUnitPrice() {
    return
  }

}
export class InvoiceRow {
  public get formatNumber() {
    let a = ((this.unitPrice)*1000).toLocaleString('vi-vn');
    return a;
  }
  public get formatTotalNumber() {
    let a = (this.unitPrice) * this.qty;
    return (a*1000).toLocaleString('vi-vn');
  }
  public get total(): number {
    return ((this.unitPrice) * this.qty)*1000;
  }
  public get amountColumn(): string {
    let result = '';
    result = this.qty + ' ' + this.unit;
    return result;
  }

  constructor(
    public productName: string,
    public unitPrice: number,
    public qty: number,
    public unit: string,
  ) { }
}