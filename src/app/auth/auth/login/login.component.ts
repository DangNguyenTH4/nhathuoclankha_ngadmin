import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { TokenStorageService } from '../../../service/tokenstorage.service';
import { CustomerControllerService } from '../../../../typescript-angular-client';
import { Logger } from '../../../log.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService,CustomerControllerService]
})
export class LoginComponent  extends NbLoginComponent  implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  constructor(
    private log:Logger,
    private customerControllerService: CustomerControllerService,
    private authService:AuthService, private tokenStorageService:TokenStorageService,
    private nbAuthServe:NbAuthService,@Inject(NB_AUTH_OPTIONS) options:{},cd: ChangeDetectorRef, router: Router){
    super(nbAuthServe,options,cd,router);
    
  }
  login(){
    this.log.log(this.user);
    let loginTrue = this.authService.login(this.user);
    this.log.logAny(loginTrue);
    this.router.navigate(["/store"]);

  }
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.isLoggedIn=true;
    }
  }
}
