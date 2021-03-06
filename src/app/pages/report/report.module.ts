import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbDatepickerModule, NbInputModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsLineComponent } from './chartjs/chartjs-line.component';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
import { ChartjsBarHorizontalComponent } from './chartjs/chartjs-bar-horizontal.component';
import { ChartjsRadarComponent } from './chartjs/chartjs-radar.component';
import { D3BarComponent } from './d3/d3-bar.component';
import { D3LineComponent } from './d3/d3-line.component';
import { D3PieComponent } from './d3/d3-pie.component';
import { D3AreaStackComponent } from './d3/d3-area-stack.component';
import { D3PolarComponent } from './d3/d3-polar.component';
import { D3AdvancedPieComponent } from './d3/d3-advanced-pie.component';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { ReportRoutingModule, routedComponents } from './report-routing.module';
import { NormalReportComponent } from './normal-report/normal-report.component';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { SharedModule } from '../sharedmodule/sharemodule.module';
import { FormsModule } from '@angular/forms';
import { HistoryimportComponent } from './historyimport/historyimport.component';
import { HistorysellComponent } from './historysell/historysell.component';
import { MyCoreModule } from '../../service/core2';
import { MySellHistoryComponent } from './my-sell-history/my-sell-history.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SellMedicineControllerService } from '../../../typescript-angular-client';
import { DetailSellComponent } from './detail-sell/detail-sell.component';

const components = [
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  ChartjsBarHorizontalComponent,
  ChartjsRadarComponent,
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AreaStackComponent,
  D3PolarComponent,
  D3AdvancedPieComponent,
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    ReportRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    
    GridModule, 
    PDFModule ,
    ExcelModule, 
    
    NbCardModule,
    NbDatepickerModule , 
    NbInputModule,
    NbButtonModule,
    FormsModule,
    MyCoreModule,
    
    
    
  ],
  declarations: [...routedComponents, ...components, NormalReportComponent, HistoryimportComponent, HistorysellComponent, MySellHistoryComponent, DetailSellComponent,
  ],
  entryComponents:[],
  providers:[SellMedicineControllerService]
})
export class ReportModule {}
