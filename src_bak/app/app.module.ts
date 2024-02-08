import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistDetailComponent } from './checklist-detail/checklist-detail.component';
import { CustomsbrokerlistComponent } from './customsbrokerlist/customsbrokerlist.component';
import { HttpClientModule } from '@angular/common/http';
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
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule, NgxSpinnerModule, ToastrModule.forRoot(),Ng2SearchPipeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
