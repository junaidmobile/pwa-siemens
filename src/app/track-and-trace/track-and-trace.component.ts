import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-track-and-trace',
  templateUrl: './track-and-trace.component.html',
  styleUrls: ['../style.scss'],
  animations: [routerTransition()]
})
export class TrackAndTraceComponent implements OnInit {
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
  perWareHouse: number;
  showDiv: boolean;
  TypeShow: any;
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService) {
    localStorage.removeItem('isLoggedin');
    localStorage.clear();
    this._unsubscribeall = new Subject();
    this.MileStoneDivdiv = false;
    this.HAWBdiv = false;
    this.title = 'Track and Trace';
  }



  objTracknTrace: TrackNTrace = new TrackNTrace();

  public isCollapsed = false;

  ngOnInit(): void {
    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.OrgProdId = this.userinfo['OrgProdId'];
    this.OrgId = this.userinfo['OrgId'];



  }


  getTrackAndTrace() {

   // localStorage.removeItem('hawbno')
    //  // console.log('this.hawbno=' + this.HAWBNumber)
    var paramvalue = this.objTracknTrace.HOUSENO;
    //   if (paramvalue=='') {
    //     this.notification.success('Please enter number');
    //     return
    //   }

    var HOUSENO, PONO, InvoiceNO, JobRefNo, MAWBNO, UCRNO,BENo, Type
    Type = this.objTracknTrace.Type;

    this.TypeShow = Type;
    this.objTracknTrace.HOUSENO = '';
    if (this.objTracknTrace.Type == "HOUSENO") {
      this.objTracknTrace.HOUSENO = paramvalue
      HOUSENO = paramvalue
      // this.HAWBNumber = paramvalue
    }
    else if (this.objTracknTrace.Type == "PONO") {
      this.objTracknTrace.PONO = paramvalue
      PONO = paramvalue
    }
    else if (this.objTracknTrace.Type == "InvoiceNO") {
      this.objTracknTrace.InvoiceNO = paramvalue
      InvoiceNO = paramvalue
    }
    else if (this.objTracknTrace.Type == "JobRefNo") {
      this.objTracknTrace.JobRefNo = paramvalue
      JobRefNo = paramvalue
    }
    else if (this.objTracknTrace.Type == "MAWBNO") {
      this.objTracknTrace.MAWBNO = paramvalue
      MAWBNO = paramvalue
    }
    else if (this.objTracknTrace.Type == "UCRNO") {
      this.objTracknTrace.UCRNO = paramvalue
      UCRNO = paramvalue
    }
    else if (this.objTracknTrace.Type == "BENo") {
      this.objTracknTrace.BENo = paramvalue
      BENo = paramvalue
    }
    else if (this.objTracknTrace.Type == "") {

    }
    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/TrackNTrace/GetTrackNTraceData';
    //this.objTracknTrace.HOUSENO = 'FRA-20610581'
    this.req.RequestObject = this.objTracknTrace;
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {

          console.log(data);

          if (data['status'].startsWith("S")) {
            this.showDiv = false;
            this.objTracknTrace.Type = '0';
            this.HAWBdiv = true;
            this.toastr.error(data['status']);
            this.spinner.hide();
          } else {
            this.showDiv = true;
            this.objTracknTrace = data;


            this.HAWBNo = paramvalue; // this.objTracknTrace['HAWBNumber'];
            this.MileStoneDivdiv = true;
            this.HAWBdiv = true;
            this.objTracknTrace.Type = '0';
            // this.objTracknTrace.HOUSENO = this.HAWBNo;
            this.spinner.hide();
          }
          // var n = data['status'].startsWith("Hello");
          // // if (data['status']) {

          // // }


        },
        (_error) => {
          this.spinner.hide();
          console.log('error', _error.error.error);
          this.toastr.error('Record not found');
          this.MileStoneDivdiv = false;
          this.HAWBdiv = false;
        },
        () => {
          console.log('Call executed LogIn');
        }
      );

  }


  exit() {

    console.log("in cancel button");
    this.router.navigate(['/login']);
  }


}
