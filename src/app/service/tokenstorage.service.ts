import { Injectable } from '@angular/core';
import { CommonData } from '../common/common';
import { Logger } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private log:Logger) { }

/**
 * This comment for Localstorage
 */

  // signOut() {
  //   // window.sessionStorage.clear();
  //   localStorage.clear();
  // }

  // public saveToken(token: string) {
  //   // window.sessionStorage.removeItem(TOKEN_KEY);
  //   // window.sessionStorage.setItem(TOKEN_KEY, token);
  //   localStorage.removeItem(CommonData.TOKEN_KEY);
  //   localStorage.setItem(CommonData.TOKEN_KEY,token);
  // }
  // public saveRole(role:string){
  //   localStorage.removeItem(CommonData.ROLE_KEY);
  //   localStorage.setItem(CommonData.ROLE_KEY,role);
  // }
  // public getrole(){
  //   localStorage.getItem(CommonData.ROLE_KEY);
  // }

  // public getToken(): string {
  //   // return sessionStorage.getItem(TOKEN_KEY);
  //   let token = localStorage.getItem(CommonData.TOKEN_KEY);
  //   this.log.log("Get token from tokenService: "+token);
  //   return token;
  // }

/**
 * ####
 * This for session
 */

public saveUsername(username:string){
  sessionStorage.setItem(CommonData.USERNAME_KEY,username);
}
public getUsername():string{
  return sessionStorage.getItem(CommonData.USERNAME_KEY);
}
public clear() {
  // window.sessionStorage.clear();
  sessionStorage.clear();
}

public saveToken(token: string) {
  window.sessionStorage.removeItem(CommonData.TOKEN_KEY);
  window.sessionStorage.setItem(CommonData.TOKEN_KEY, token);
  // localStorage.removeItem(CommonData.TOKEN_KEY);
  // localStorage.setItem(CommonData.TOKEN_KEY,token);
}
public saveRole(role:string){
  sessionStorage.removeItem(CommonData.ROLE_KEY);
  sessionStorage.setItem(CommonData.ROLE_KEY,role);
  // localStorage.removeItem(CommonData.ROLE_KEY);
  // localStorage.setItem(CommonData.ROLE_KEY,role);
}
public getrole(){
  sessionStorage.getItem(CommonData.ROLE_KEY);
}

public getToken(): string {
  // return sessionStorage.getItem(TOKEN_KEY);
  let token = sessionStorage.getItem(CommonData.TOKEN_KEY);
  this.log.log("Get token from tokenService: "+token);
  return token;
}
}
