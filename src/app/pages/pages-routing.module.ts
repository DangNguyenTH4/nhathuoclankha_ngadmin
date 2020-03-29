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
      path: 'dashboard',
      component: ECommerceComponent,
    },

    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'sell-medicine',
      canActivate:[AuthGuardService],
      // loadChildren: () => import('./sell-medicine/sell-medicine.module')
      //   .then(m => m.SellMedicineModule),
      loadChildren:'./sell-medicine/sell-medicine.module#SellMedicineModule'
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
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
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
