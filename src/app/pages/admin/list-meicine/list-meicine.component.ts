import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../service/auth-service.service';
import { SellMedicineControllerService, SellOrderDto } from '../../../../typescript-angular-client';
import { Logger } from '../../../log.service';
import { GenerateFileName } from '../../../common/genfilename';
import { AdminControllerService } from '../../../../typescript-angular-client/api/adminController.service';
import { InvoiceRow, InvoiceCommonComponent } from '../../sharedmodule/invoice-common/invoice-common.component';
import { NbDialogService } from '@nebular/theme';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

@Component({
  selector: 'ngx-list-meicine',
  templateUrl: './list-meicine.component.html',
  styleUrls: ['../scss.file.scss','../css.file.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AdminControllerService]
})
export class ListMeicineComponent implements OnInit { 
  public state: State = {
    skip: 0,
    take: 15,

    // Initial filter descriptor
    // filter: {
    //   logic: 'and',
    //   filters: []
    // }
};
  public formatOptions: any = Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd', currencyDisplay: 'name' });
  constructor(private adminControllerService: AdminControllerService,
    private authService : AuthService,
    private dialogService:NbDialogService
    , private log: Logger,
  ) {
    this.adminControllerService.getListAllUsingPOST().subscribe(data => {
      // this.loadHistoryImport(data);
      console.log(data[0]);
      this.source=data;
      this.products = process(data,this.state);
    });

  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.products = process(this.source, this.state);
}
  ngOnInit() {
  }
  public products: GridDataResult ;
  private source:any[] = [];
  genFileReport(): string {
    return GenerateFileName.printListMedicine() + '.pdf';
  }
  testPrintDate() {
    this.adminControllerService.getListAllUsingPOST().subscribe(data => {
      console.log(data[0]);
      this.source=data;
      this.products = process(data,this.state);
    });
  }
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  
  // cellClickEvent(event){
  //   console.log(event);
  //   console.log(event.rowIndex);
  //   this.seeInvoice(event.dataItem);
  // }


  cellClickEvent(event) {
    // //TODO Then : each row click -> query to server. (Lazy load)
    // this.sellMedicineControllerService.reportMyHistorySellByIdGET(event.dataItem.id).subscribe(bdata => {
    //   console.log(bdata);
    //   // this.source.load(bdata[0].listMedicines);

    //   let dataNew :InvoiceRow[]  =[];
    //   for(let dto of bdata.listInvoice){
    //     dataNew.push(new InvoiceRow(dto.productName,dto.unitPrice,dto.addMore,dto.amount,dto.unit));
    //   }
    //    this.dialogService.open(InvoiceCommonComponent,
    //   {
    //     context: { data: dataNew, customer: {name:event.dataItem.customerName} },
    //     hasBackdrop: true,
    //   });
    // });
  }
}
export const invoiceData = [
  new InvoiceRow("A", 123, 456, 789, "Kg"),
];

export interface HistoryDto {
  id?: number;
  sellDate?: String;
  customerName?: String;
  total?: number;
  staffName?: String;
}