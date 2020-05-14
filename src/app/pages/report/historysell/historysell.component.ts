import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenerateFileName } from '../../../common/genfilename';
import { DateUtils } from '../../../common/utils/DateUtils';
import { SellOrderDto, SellMedicineControllerService } from '../../../../typescript-angular-client';
import { AdminControllerService } from '../../../../typescript-angular-client/api/adminController.service';
import { Logger } from '../../../log.service';
import { InvoiceRow, InvoiceCommonComponent } from '../../sharedmodule/invoice-common/invoice-common.component';
import { NbDialogService } from '@nebular/theme';
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

@Component({
  selector: 'ngx-historysell',
  templateUrl: './historysell.component.html',
  styleUrls: ['../scss.file.scss','../css.file.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AdminControllerService]
})
export class HistorysellComponent implements OnInit {
  public formatOptions: any = Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd', currencyDisplay: 'name' });
  constructor(private adminControllerService: AdminControllerService,
    private sellMedicineControllerService:SellMedicineControllerService,
    private dialogService:NbDialogService
    , private log: Logger
  ) {
    this.adminControllerService.reportHistorySellGET(DateUtils.toStartOfDate(this.fromDate).toISOString(), DateUtils.toEndOfDate(this.toDate).toISOString()).subscribe(data => {
      this.loadHistoryImport(data);
    });

  }

  ngOnInit() {
  }
  public products: any[] = [];
  genFileReport(): string {
    return GenerateFileName.genNormalReportName('homNay', 'vaiHomNua', '') + '.pdf';
  }
  testPrintDate() {
    this.adminControllerService.reportHistorySellGET(DateUtils.toStartOfDate(this.fromDate).toISOString(), DateUtils.toEndOfDate(this.toDate).toISOString()).subscribe(data => {
      this.loadHistoryImport(data);
    });
  }
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  loadHistoryImport(listSellDto: Array<SellOrderDto>) {
    this.products = [];
    let sum = 0;
    for (let dto of listSellDto) {

      let historySample: HistoryDto = {
        id: dto.id,
        sellDate: new Date(dto.time).toLocaleDateString('vi-VN', options),
        customerName: dto.customer.name,
        total: dto.total * 1000,
        staffName: dto.seller
      };
      sum += dto.total;
      console.log(historySample);
      this.products.push(historySample);
    }
    let historySample :HistoryDto = {customerName:'Tổng cộng: ',total:sum*1000};
    this.products.push(historySample);
  }
  cellClickEvent(event) {

    console.log(event);

    //TODO Then : each row click -> query to server. (Lazy load)
    this.sellMedicineControllerService.reportMyHistorySellByIdGET(event.dataItem.id).subscribe(bdata => {
      console.log(bdata);
      // this.source.load(bdata[0].listMedicines);

      let dataNew: InvoiceRow[] = [];
      for (let dto of bdata.listInvoice) {
        dataNew.push(new InvoiceRow(dto.productName, dto.unitPrice, dto.addMore, dto.amount, dto.unit));
      }
      this.dialogService.open(InvoiceCommonComponent,
        {
          context: { data: dataNew,sellDate:event.dataItem.sellDate, customer: { name: event.dataItem.customerName,traiDungThuoc:bdata.customer.traiDungThuoc } },
          hasBackdrop: true,
        });
    });
  }
}
export interface HistoryDto {
  id?: number;
  sellDate?: String;
  customerName?: String;
  total?: number;
  staffName?: String;
}
