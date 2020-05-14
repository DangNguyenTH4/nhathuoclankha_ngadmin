import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CreateNewComponent } from './create-new/create-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    NbMomentDateModule,
  ],
  declarations: [
    PagesComponent,
    CreateNewComponent,
    
  ],
})
export class PagesModule {
}
