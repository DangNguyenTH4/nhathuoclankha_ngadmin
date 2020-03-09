import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../pages/sharedmodule/sharemodule.module';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { Logger } from '../log.service';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
  ],
  providers:[Logger]
  
})
export class AdminModule { }
