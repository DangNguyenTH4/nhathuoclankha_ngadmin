/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbTokenStorage, NbTokenService, NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { CoreModule } from './@core/core.module';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth-service.service';
import { AuthenticateControllerService } from '../typescript-angular-client';
import { JwtInterceptorService, authInterceptorProviders } from './service/jwt.interceptor.service';
import { MyCoreModule } from './service/core2';
import { ToastrService } from './pages/sharedmodule/toast';
@NgModule({
  declarations: [AppComponent], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    AppRoutingModule,

    ThemeModule.forRoot(),
    
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
   
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key:'token',
          },
          baseEndpoint: environment.host,
              login: {
                // ...
                endpoint: '/api/auth/login',
                method: 'post',
              },
              register: {
                // ...
                endpoint: '/api/auth/register',
                method: 'post',
              },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          // showMessages: {     // show/not show success/error messages
          //   success: true,
          //   error: true,
          // },
          redirect: {
            success: '/store/',
            failure: null, // stay on the same page
          },
          // socialLinks: socialLinks, // social links at the bottom of a page
        },
      },
    }), 

    CoreModule.forRoot(),
    // MyCoreModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers:[AuthenticateControllerService,ToastrService
  ],
  entryComponents:[AppComponent]
  
})
export class AppModule {
}

export interface NbAuthSocialLink {
  link?: string,
  url?: string,
  target?: string,
  title?: string,
  icon?: string,
}

const socialLinks: NbAuthSocialLink[] = [];

export const defaultSettings: any = {
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'email',  // strategy id key.
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      strategy: 'email',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};
