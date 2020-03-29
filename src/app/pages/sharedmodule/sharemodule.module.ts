import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule, NbButtonModule, NbDialogModule, NbWindowModule, NbInputModule } from '@nebular/theme';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { ToastrComponent } from './toastr/toastr.component';
import { ChartjsLineComponent } from './chartjs-line.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';
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

    ],
    declarations: [DatetimePickerComponent,ToastrComponent,ChartjsLineComponent],
    exports: [
        //  Com
        DatetimePickerComponent,
        ToastrComponent,
        ChartjsLineComponent
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
})




export class SharedModule { }