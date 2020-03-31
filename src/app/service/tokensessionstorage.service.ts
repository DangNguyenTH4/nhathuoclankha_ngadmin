// import { Injectable } from '@angular/core';
// import { CommonData } from '../common/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokensessionstorageService {

//   constructor(
//     ) { }
//   signOut() {
//     // window.sessionStorage.clear();
//     sessionStorage.clear();
//   }

//   public saveToken(token: string) {
//     window.sessionStorage.removeItem(CommonData.TOKEN_KEY);
//     window.sessionStorage.setItem(CommonData.TOKEN_KEY, token);
//     // localStorage.removeItem(CommonData.TOKEN_KEY);
//     // localStorage.setItem(CommonData.TOKEN_KEY,token);
//   }
//   public saveRole(role:string){ 
//     sessionStorage.removeItem(CommonData.ROLE_KEY);
//     sessionStorage.setItem(CommonData.ROLE_KEY,role);
//     // localStorage.removeItem(CommonData.ROLE_KEY);
//     // localStorage.setItem(CommonData.ROLE_KEY,role);
//   }
//   public getrole(){
//     sessionStorage.getItem(CommonData.ROLE_KEY);
//   }

//   public getToken(): string {
//     // return sessionStorage.getItem(TOKEN_KEY);
//     let token = sessionStorage.getItem(CommonData.TOKEN_KEY);
//     return token;
//   }

//   // public saveUser(user) {
//   //   window.sessionStorage.removeItem(USER_KEY);
//   //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
//   // }

//   // public getUser() {
//   //   return JSON.parse(sessionStorage.getItem(USER_KEY));
//   // }
// }
