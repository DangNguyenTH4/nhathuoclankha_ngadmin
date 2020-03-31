import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateUtils } from '../../../common/utils/DateUtils';
import { GenerateFileName } from '../../../common/genfilename';
import { AdminControllerService } from '../../../../typescript-angular-client/api/adminController.service';
import { ImportOrderDto } from '../../../../typescript-angular-client';
import { Logger } from '../../../log.service';
const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
@Component({
  selector: 'ngx-historyimport',
  templateUrl: './historyimport.component.html',
  styleUrls: ['../scss.file.scss','../css.file.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AdminControllerService]
})


export class HistoryimportComponent implements OnInit {

  constructor(private adminControllerService: AdminControllerService
    ,private log:Logger
    ) {
    this.adminControllerService.reportHistoryImportGET(DateUtils.toStartOfDate(this.fromDate).toISOString(), DateUtils.toEndOfDate(this.toDate).toISOString()).subscribe(data => {
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
    this.adminControllerService.reportHistoryImportGET(DateUtils.toStartOfDate(this.fromDate).toISOString(), DateUtils.toEndOfDate(this.toDate).toISOString()).subscribe(data => {
      this.loadHistoryImport(data);
    });
  }
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  loadHistoryImport(listImportDto:Array<ImportOrderDto>){
    this.products = [];
    for(let dto of listImportDto){
      for(let medicineDto of dto.listMedicineImport){
        this.log.logAny(dto.importDate);
        let historySample:HistoryDto = {
          id:dto.id,
          importDate:new Date(dto.importDate).toLocaleDateString('vi-VN', options),
          medicineCode:medicineDto.code,
          amount:medicineDto.amount,
          staffName:dto.staffName
        };
        console.log(historySample);
        this.products.push(historySample);
      }
      
    }
  }
}

export interface HistoryDto{
  id?:number;
  importDate?:String;
  medicineCode?:String;
  amount?:number;
  staffName?:String;
}
