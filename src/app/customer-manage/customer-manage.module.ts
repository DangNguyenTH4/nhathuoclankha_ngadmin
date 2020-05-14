import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule, NbMenuModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { AuthService } from '../service/auth-service.service';
import { MyCoreModule } from '../service/core2';
import { CustomerManageModuleRouting } from './customer-manage-routing.module';
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { CustomerManageLayoutComponent } from './customer-manage-layout.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbMomentDateModule } from '@nebular/moment';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    CustomerManageModuleRouting,
    NbAuthModule,
    MyCoreModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule ,
    NbMomentDateModule,
  ],
  declarations: [
    CustomerManageComponent, CustomerManageLayoutComponent
  ],
  providers:[AuthService]
})
export class CustomerManageModule { }
