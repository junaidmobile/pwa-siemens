import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistDetailComponent } from './checklist-detail/checklist-detail.component';
import { CustomsbrokerlistComponent } from './customsbrokerlist/customsbrokerlist.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { CBDetailComponent } from './cb-detail/cb-detail.component';
import { CCDetailComponent } from './cc-detail/cc-detail.component';
import { TrackAndTraceComponent } from './track-and-trace/track-and-trace.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

import * as CryptoJS from 'crypto-js';
import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
  MsalService,
  MsalGuard,
  MsalRedirectComponent,
  MsalModule,
  MsalInterceptor,
} from '@azure/msal-angular';

const GRAPH_ENDPOINT = 'Enter_the_Graph_Endpoint_Herev1.0/me';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'Z2Yp0FjDCuk9Dv2McBx6VjHv34J9qd31',
      authority: 'https://login.microsoftonline.com/e0b26355-1889-40d8-8ef1-e559616befda',
      redirectUri: 'https://eccportal.siemens-healthineers.com/api/Autologin/Redirect/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    ChecklistComponent,
    ChecklistDetailComponent,
    CustomsbrokerlistComponent,
    HeaderComponent,
    CBDetailComponent,
    CCDetailComponent,
    TrackAndTraceComponent
  ],
  imports: [
    BrowserModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule, NgxSpinnerModule, ToastrModule.forRoot(),
    Ng2SearchPipeModule, MsalModule,


    
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
