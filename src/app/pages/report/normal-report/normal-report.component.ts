import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { products, reportSample } from './products';
import { GenerateFileName } from '../../../common/genfilename';
import { AdminControllerService } from '../../../../typescript-angular-client/api/adminController.service';
import { DateUtils } from '../../../common/utils/DateUtils';
@Component({
  selector: 'ngx-normal-report',
  templateUrl: './normal-report.component.html',
  styleUrls: ['../scss.file.scss','../css.file.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AdminControllerService]
})
export class NormalReportComponent implements OnInit {

  constructor(private adminControllerService: AdminControllerService) {
    this.adminControllerService.reportUsingGET(DateUtils.toStartOfDate(this.fromDate).toISOString(), DateUtils.toEndOfDate(this.toDate).toISOString()).subscribe(data => {
      this.products = data;
    });

  }

  ngOnInit() {
  }
  public products: any[] = reportSample;
  genFileReport(): string {
    return GenerateFileName.genNormalReportName('homNay', 'vaiHomNua', '') + '.pdf';
  }
  getReport() {
    this.adminControllerService.reportUsingGET(DateUtils.toStartOfDate(this.fromDate).toISOString(), DateUtils.toEndOfDate(this.toDate).toISOString()).subscribe(data => {
      this.products = data;
    });
  }
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
}
