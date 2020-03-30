import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule, NbButtonModule, NbDialogModule, NbWindowModule, NbInputModule } from '@nebular/theme';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { ToastrComponent } from './toastr/toastr.component';
import { ChartjsLineComponent } from './chartjs-line.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceCommonComponent } from './invoice-common/invoice-common.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { IntlModule } from '@progress/kendo-angular-intl';
import { GridModule } from '@progress/kendo-angular-grid';
const ENTRY_COMPONENTS = [

];
@NgModule({
    imports: [
        NgxChartsModule,

        ChartModule,
        CommonModule
        , NbInputModule
        , NbCardModule
        , NbButtonModule
        , NbDialogModule
        , NbDialogModule.forChild(),
        NbWindowModule.forChild(),
        // IntlModule,
        GridModule,
        // PDFExportModule,


    ],
    declarations: [DatetimePickerComponent, ToastrComponent, ChartjsLineComponent, InvoiceCommonComponent],
    exports: [
        InvoiceCommonComponent,

    ],
    entryComponents: [InvoiceCommonComponent,
        ...ENTRY_COMPONENTS
    ],
})




export class SharedModule { }