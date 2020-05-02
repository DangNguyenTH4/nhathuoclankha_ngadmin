import { Injectable } from '@angular/core';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { AuthenticateControllerService } from '../../typescript-angular-client';
import { JwtRequest } from '../../typescript-angular-client/model/JwtRequest';
import { JwtResponse } from '../../typescript-angular-client/model/JwtResponse';
import { TokenStorageService } from './tokenstorage.service';
import { Router } from '@angular/router';
import { CommonData } from '../common/common';
import { Logger } from '../log.service';
import { ToastrService } from '../pages/sharedmodule/toast';
import { RoleConstant } from './roleconstant';
import { MENU_ITEMS_ACCOUNTANT } from '../pages/pages-menu';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private wasAuthen=false;
  constructor(
    private authControllerService:AuthenticateControllerService,
    private router:Router,
    private tokenStorage:TokenStorageService,
    private toast:ToastrService) {
    
  }
  login(username : JwtRequest){
    // this.authControllerService.authenticate(username).subscribe(data=>{
    //   this.log.log(data);
    //   return data;
    // },error=>{
    //   this.log.log(error);
    // });
    // return null;
    this.authControllerService.authenticate(username).subscribe(data=>{
      this.tokenStorage.saveToken(data.token);
      this.wasAuthen=true;
      this.tokenStorage.saveRole(data.role);
      this.tokenStorage.saveUsername(data.name);
      this.navigateByRole(data.role);
      return "OK";
    },error=>{
      this.toast.notify(3,"Login failed!","Mật khẩu / tài khoản không đúng!");
      this.wasAuthen=false;
      return error;
    });
  }
  logout(){
    this.tokenStorage.clear();
    this.router.navigate(['auth/login']);
  }
  getToken():string{
    return this.tokenStorage.getToken();
  }
  isAuthenticated():boolean{
    let token  = this.tokenStorage.getToken();

    if(token){
      return  true;
    }
    return false;
  }
  getUserName(){
    return this.tokenStorage.getUsername();
  }
  navigateByRole(role:String){
    if (role===RoleConstant.ROLEACCOUNTANT){
      this.router.navigate(['/'+CommonData.StorePagePrefix+'/report/report1']);
    } else if (role === RoleConstant.ROLEADMIN || 
      role === RoleConstant.ROLEDIRECTOR || 
      role === RoleConstant.ROLESTAFF){
        this.router.navigate(['/'+CommonData.StorePagePrefix+"/sell-medicine"]);
      }
    else{
      this.tokenStorage.clear();
      this.router.navigate(['auth/login']);
    }
  }
}
