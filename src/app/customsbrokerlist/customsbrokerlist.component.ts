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
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
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
  url: any;
  apiUrl: string;
  fromDashboard: string;
isButtonHide :boolean;
  constructor(
    private spinnerOff: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService,
    private searchFilter: Ng2SearchPipeModule,
    private http: HttpClient,



  ) {
    localStorage.removeItem('isLoggedin');
    this.fromDashboard = localStorage.getItem('CCorCB');
    if (this.fromDashboard == 'FromCC') {
      this.title = 'Unassigned CC';
      this.isButtonHide = true;
    } else {
      this.title = 'Unassigned CB';
      this.isButtonHide = false;
    }
   // localStorage.clear();

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

  // getHAWBList() {

  //   this.spinner.show();
  //   this.req = new Requestmodels();
  //   this.req.RequestUrl = 'api/UCR/GetHAWBList';
  //   this.req.RequestObject = '';
  //   this._http
  //     .PostData(this.req)
  //     .pipe(takeUntil(this._unsubscribeall))
  //     .subscribe(
  //       (data) => {
  //         console.log(data);
  //         this.HAWBListobj = data;

  //         if (this.fromDashboard == "FromCC") {

  //           this.HAWBListobj = data.filter(function (val) {
  //             return val.CostCenter  == "" || val.CostCenter  == null;

  //           });

  //         } else if (this.fromDashboard == 'FromCB') {
  //           this.HAWBListobj = data.filter(function (val1) {
  //             return val1.CustomsBrokerBranchId == 0 || val1.CustomsBrokerBranchId == null;
  //           });
  //         }

  //         // console.log(this.HAWBListobj.length)
  //         // for (var i = 0; i < this.HAWBListobj.length; i++) {
  //         //   var obj = this.HAWBListobj[i]['CheckListApprovalStatus'];
  //         //   console.log(this.HAWBListobj[i]['CheckListApprovalStatus']);
  //         // }


  //         // console.log(this.HAWBListobj);
  //         this.spinner.hide();
  //       },
  //       (_error) => {
  //         this.spinner.hide();
  //         console.log(_error);
  //         this.toastr.error(_error.error.error);
  //       },
  //       () => {
  //         console.log('Call executed Charge Fill');
  //       }
  //     );
  // }

  getHAWBList() {

    debugger
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/UCR/GetHAWBListPWA';
    if (this.fromDashboard == "FromCC") {
      this.req.RequestObject = '{"PWA_CostCenter":true,"PWA_CustomsBroker":false}';
    } else if (this.fromDashboard == "FromCB") {
      this.req.RequestObject = '{"PWA_CostCenter":false,"PWA_CustomsBroker":true}';
    }
    this.spinnerOff.show();
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(this.HAWBListobj);
          this.HAWBListobj = data;
          this.spinnerOff.hide();

        },
        (_error) => {
          this.spinnerOff.hide();
          console.log(_error);
          this.toastr.error(_error.error.error);
        },
        () => {
          console.log('Call executed Charge Fill');
        }
      );
    // this.submitted = true;
    //this.req = new Requestmodels();
    // if (this.fromDashboard == "FromCC") {
    //   this.req.RequestUrl = 'api/UCR/GetHAWBListPWA?PWA_CostCenter='
    //     + true + '&PWA_CustomsBroker=' + null;
    // }
    // else if (this.fromDashboard == 'FromCB') {
    //   this.req.RequestUrl = 'api/UCR/GetHAWBListPWA?PWA_CostCenter='
    //     + null + '&PWA_CustomsBroker=' + true;
    // }
    // this.req.RequestUrl = 'api/UCR/GetHAWBListPWA?PWA_CostCenter='
    // + true + '&PWA_CustomsBroker=' + null;

    // this._http
    //   .GetData(this.req)
    //   .pipe(takeUntil(this._unsubscribeall))
    //   .subscribe(
    //     (data) => {

    //       console.log(data);
    //       if (data != '') {
    //         //CheckListApprovalStatus

    //         // this.HWABID = this.CheckListDetail[0]['HawbID']

    //         //   sessionStorage.setItem('currentuser', JSON.stringify(data));
    //         //   this._router.navigate(['/dashboard']);
    //         this.spinner.hide();

    //       }
    //       else {

    //         this.spinner.hide();
    //         this.toastr.error('No record found to display.');
    //       }

    //     },
    //     (_error) => {
    //       debugger
    //       this.spinner.hide();
    //       console.log('error', _error.error.error);
    //       this.toastr.error(_error.error.error);
    //     },
    //     () => {
    //       console.log('Call executed LogIn');
    //     }
    //   );

  }


  gocbdetail(HAWBId, HouseNo,BEType) {
debugger
    localStorage.setItem('HAWBId', HAWBId);
    localStorage.setItem('HouseNo', HouseNo);
    localStorage.setItem('BEType', BEType);

    localStorage.setItem('comeFromCB', 'true');
    // const body = { "HAWBId": 453, "HAWBNO": "FRA-20609949", "CustomBrokerCode": "CB1", "CustomBrokerName": "cb_thane", "OrgProdId": 2, "UserId": 2, "OrgId": 2 }
    // this.http.post<any>('https://eccportal.kalelogistics.com/api/UCR/UpSertHAWBCB', body).subscribe(data => {
    //   console.log("in gocbdetail", data);
    // })
    this.router.navigate(['/cbdetail']);
  }




  goccdetail(HAWBId,BEType) {
    localStorage.setItem('BEType', BEType);
    localStorage.setItem('HAWBId', HAWBId);
    localStorage.setItem('comeFromCC', 'true');
    // const body = { "HAWBID": 8, "CC": "B25009AC", "PC": "Profit center", "OrgProdId": 2, "UserId": 2, "OrgId": 2 }
    // this.http.post<any>('https://eccportal.kalelogistics.com/api/UCR/UpSertOpenPO', body).subscribe(data => {
    //   console.log("in goccdetail", data);
    // })

    this.router.navigate(['/ccdetail']);
  }



  goAssignToCostomBroker() {

  }

  exit() {

    console.log("in cancel button");
    this.router.navigate(['/login']);
  }

}

