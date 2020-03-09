import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { ReportComponent } from './report.component';
import { NormalReportComponent } from './normal-report/normal-report.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {path:'',redirectTo:'monthly',pathMatch:'full'},
    {
    path: 'weekly',
    component: EchartsComponent,
  }, {
    path: 'monthly',
    component: D3Component,
  }, {
    path: 'yearly',
    component: ChartjsComponent,
  },{
    path:'report1',
    component:NormalReportComponent,
  }],
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
