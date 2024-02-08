import { Component, OnInit, Pipe } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup } from '@angular/forms';
import { Requestmodels } from '../classes/request.models';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpsService } from '../shared/rest-api.service';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrackNTrace } from '../classes/TrackNTrace';
import * as $ from 'jquery';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-customsbrokerlist',
  templateUrl: './customsbrokerlist.component.html',
  styleUrls: ['../style.scss'],
  animations: [routerTransition()]
})
export class CustomsbrokerlistComponent implements OnInit {
  title: string;
  userinfo: any = [];
  OrgProdId: any;
  status: any = 'Pending';
  private _unsubscribeall: Subject<any>;
  trackNtrace: FormGroup;
  submitted = false;
  req: Requestmodels;
  show: boolean;
  OrgId: string;
  HAWBNo: any;
  ddlvale: any;
  MileStoneDivdiv: boolean;
  HAWBdiv: boolean;
  HAWBListobj: any;
  searchByHAWBNo: any;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService,
    private searchFilter: Ng2SearchPipeModule
  ) {
    localStorage.removeItem('isLoggedin');
    localStorage.clear();
    this.title = 'Jobs Assignmente';
    this._unsubscribeall = new Subject();
  }

  objTracknTrace: TrackNTrace = new TrackNTrace();

  public isCollapsed = false;

  ngOnInit(): void {
    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.OrgProdId = this.userinfo['OrgProdId'];
    this.OrgId = this.userinfo['OrgId'];

    this.getHAWBList();
  }

  getHAWBList() {
    this.spinner.show();
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/UCR/GetHAWBList';
    this.req.RequestObject = '';
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.HAWBListobj = data;
          // console.log(this.HAWBListobj);
          this.spinner.hide();
        },
        (_error) => {
          this.spinner.hide();
          console.log(_error);
          this.toastr.error(_error.error.error);
        },
        () => {
          console.log('Call executed Charge Fill');
        }
      );
  }

  gocbdetail() {
    this.router.navigate(['/cbdetail']);
  }

  goccdetail() {
    this.router.navigate(['/ccdetail']);
  }

  goAssignToCostomBroker(){

  }

}
