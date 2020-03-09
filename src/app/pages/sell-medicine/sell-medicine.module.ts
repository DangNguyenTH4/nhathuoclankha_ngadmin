import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbUserModule, NbCheckboxModule, NbActionsModule, NbRadioModule, NbDatepickerModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SellMedicineComponent } from './sell-medicine.component';
import { SellMedicineRoutingModule } from './sell-medicine-routing.module';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import { FormsModule } from '@angular/forms';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { GridModule } from '@progress/kendo-angular-grid';
import { IntlModule } from '@progress/kendo-angular-intl';
import { InvoiceComponent } from './invoice/invoice.component';
// import { TablesRoutingModule, routedComponents } from './tables-routing.module';

@NgModule({
  imports: [ 
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbUserModule,
    NbCheckboxModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    SellMedicineRoutingModule,
    FormsModule,
    NbButtonModule,
    // ngFormsModule
    // SharedModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    IntlModule,
    GridModule,
    PDFExportModule

  ],
  declarations: [
      SellMedicineComponent,
      DialogNamePromptComponent, InvoiceComponent
  ],
  entryComponents:[
    
  ]
  
})
export class SellMedicineModule { }