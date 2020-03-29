import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { AuthModuleRouting } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../../service/auth-service.service';
import { MyCoreModule } from '../../service/core2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthModuleRouting,

    NbAuthModule,
    MyCoreModule,
  ],
  declarations: [
  LoginComponent],
  providers:[AuthService]
})
export class AuthModule { }
