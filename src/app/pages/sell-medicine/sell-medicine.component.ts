import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { TablesComponent } from '../tables/tables.component';
import { TablesModule } from '../tables/tables.module';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { SellMedicineControllerService, MedicineControllerService, MedicineDto, SellOrderDto, CustomerDto, CustomerControllerService } from '../../../typescript-angular-client';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ToastrService } from '../sharedmodule/toast';
import * as jsPDF from 'jspdf';
import { InvoiceRow, InvoiceComponent } from './invoice/invoice.component';
import { color } from 'd3-color';
import { isEmpty } from 'rxjs/operators';
import { Logger } from '../../log.service';
import { GenerateFileName } from '../../common/genfilename';
import { AuthService } from '../../service/auth-service.service';
const EMOSSCOMPANY = "Công ty Cổ Phần Nông Trại E.MOSS";
const PHONE = "PHONE";
const NAME = "NAME_";
@Component({
  selector: 'ngx-sell-medicine',
  template: `<router-outlet></router-outlet>`,
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

export class SellMedicineComponent implements OnInit {
  ngOnInit(): void {
  }
 }