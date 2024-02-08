import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistDetailComponent } from './checklist-detail/checklist-detail.component';
import { CustomsbrokerlistComponent } from './customsbrokerlist/customsbrokerlist.component';
import { CBDetailComponent } from './cb-detail/cb-detail.component';
import { CCDetailComponent } from './cc-detail/cc-detail.component';
import { TrackAndTraceComponent } from './track-and-trace/track-and-trace.component';


const routes: Routes = [

  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: 'checklistdetail', component: ChecklistDetailComponent },
  {path : 'customsbrokerlist' , component: CustomsbrokerlistComponent},
  {path : 'cbdetail' , component: CBDetailComponent},
  {path : 'ccdetail' , component: CCDetailComponent},
  {path : 'tracknadtrace' , component: TrackAndTraceComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent, DashboardComponent];
