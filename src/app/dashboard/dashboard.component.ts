import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { HttpsService } from '../shared/rest-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Requestmodels } from '../classes/request.models';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../style.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  title: string;
  userinfo: any = [];
  OrgProdId: any;
  status: any = 'Pending';
  private _unsubscribeall: Subject<any>;
  loginForm: FormGroup;
  submitted = false;
  req: Requestmodels;
  show: boolean;
  CheckListDetail: any;
  HWABID: any;
  dashboardCount: any;
  UserId: any;
  count: boolean;
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService) {
    localStorage.removeItem('isLoggedin');
    localStorage.clear();
    this._unsubscribeall = new Subject();
    this.title = 'Dashboard';

  }

  ngOnInit(): void {
    // this.spinner.show();
    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.UserId = this.userinfo['UserId'];

    this.dashboardCountByUser();

  }




  public Dashboard(mode, from) {

    if (mode === 'checklist') {
      this.router.navigate(['/checklist']);
    } else if (mode === 'CBlist') {
      if (from == 'FromCC') {
        localStorage.setItem('CCorCB', from);
      } else if (from == 'FromCB') {
        localStorage.setItem('CCorCB', from);
      }
      this.router.navigate(['/customsbrokerlist']);
    } else if (mode === 'tandt') {
      this.router.navigate(['/tracknadtrace']);
    }
  }

  dashboardCountByUser() {

    this.spinner.show();


    //setTimeout(function(){ this.spinner.show();}, 9000);

    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/PWA/GetCountForPWA?UserId='
      + this.UserId;
    console.log(this.req.RequestUrl)
    this._http
      .GetData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {

          this.dashboardCount = data;
          this.count = true;
          // console.log(this.dashboardCount.length);
          console.log(data);

          // this.HWABID = this.CheckListDetail[0]['HawbID']
          this.spinner.hide();
        },
        (_error) => {
          this.spinner.hide();
          console.log('error', _error.error.error);
          this.toastr.error(_error.error.error);
        },
        () => {
          console.log('Call executed LogIn');
        }
      );
  }



}
