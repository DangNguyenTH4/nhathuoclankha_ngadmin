import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { ReportComponent } from './report.component';
import { NormalReportComponent } from './normal-report/normal-report.component';
import { HistoryimportComponent } from './historyimport/historyimport.component';
import { HistorysellComponent } from './historysell/historysell.component';
import { MySellHistoryComponent } from './my-sell-history/my-sell-history.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    { path: '', redirectTo: 'monthly', pathMatch: 'full' },
    // {
    //   path: 'weekly',
    //   component: EchartsComponent,
    // },
    // {
    //   path: 'monthly',
    //   component: D3Component,
    // }, {
    //   path: 'yearly',
    //   component: ChartjsComponent,
    // },
    {
      path: 'report1',
      component: NormalReportComponent,
    }, {
      path: 'history-import',
      component: HistoryimportComponent,
    }, {
      path: 'history-sell-order',
      component: HistorysellComponent,
    }
    , {
      path: 'myhistory-sell',
      component: MySellHistoryComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule { }

export const routedComponents = [
  ReportComponent,

  EchartsComponent,
  D3Component,
  ChartjsComponent,
];
