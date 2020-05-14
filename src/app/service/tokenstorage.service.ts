import { Injectable } from '@angular/core';
import { CommonData } from '../common/common';
import { Logger } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private log:Logger) { }
/**
 * storage = localStorage if want to you localStorage to save data, = sesssionStorage if want to you session
 * because they have the same parrent class is Storage,
 */
private storage:Storage = localStorage;
// private storage:Storage = sessionStorage;
public saveUsername(username:string){
  this.storage.setItem(CommonData.USERNAME_KEY,username);
}
public getUsername():string{
  return this.storage.getItem(CommonData.USERNAME_KEY);
}
public clear() {
  this.storage.clear();
}

public saveToken(token: string) {
  this.storage.removeItem(CommonData.TOKEN_KEY);
  this.storage.setItem(CommonData.TOKEN_KEY, token);
}
public saveRole(role:string){
  this.storage.removeItem(CommonData.ROLE_KEY);
  this.storage.setItem(CommonData.ROLE_KEY,role);
}
public getRole():string{
  return this.storage.getItem(CommonData.ROLE_KEY);
}

public getToken(): string {
  let token = this.storage.getItem(CommonData.TOKEN_KEY);
  this.log.log("Get token from tokenService: "+token);
  return token;
}
}
