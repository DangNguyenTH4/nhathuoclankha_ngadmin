import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { CreateNewComponent } from './create-new/create-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './sharedmodule/sharemodule.module';
import { NbMomentDateModule } from '@nebular/moment';
// '@progress/kendo-angular-intl';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    SharedModule,
    DashboardModule,
    ECommerceModule,
    ReactiveFormsModule,
    NbMomentDateModule
   
    // MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    CreateNewComponent
  ],
})
export class PagesModule {
}
