import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { SellMedicineComponent } from './sell-medicine/sell-medicine.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'new-medicine',
      canActivate:[AuthGuardService],
      component: CreateNewComponent
    },
    {
      path: 'sell-medicine',
      canActivate:[AuthGuardService],
      loadChildren: () => import('./sell-medicine/sell-medicine.module')
        .then(m => m.SellMedicineModule),
      // loadChildren:'./sell-medicine/sell-medicine.module#SellMedicineModule'
    },
    {
      path: 'import-medicine',
      canActivate:[AuthGuardService],
      loadChildren: () => import('./import-medicine/import-medicine.module')
        .then(m => m.ImportMedicineModule),
    },
    {
      path: 'report',
      canActivate:[AuthGuardService],
      loadChildren: () => import('./report/report.module')
        .then(m => m.ReportModule),
    },
    {
      path: 'admin',
      canActivate:[AuthGuardService],
      loadChildren: () => import('./admin/admin-store.module')
        .then(m => m.AdminStoreModule),
    },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   redirectTo: '',
    //   pathMatch: 'full',
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
