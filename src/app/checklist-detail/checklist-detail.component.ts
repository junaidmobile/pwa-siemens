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
  selector: 'app-checklist-detail',
  templateUrl: './checklist-detail.component.html',
  styleUrls: ['../style.scss'],
  animations: [routerTransition()]
})
export class ChecklistDetailComponent implements OnInit {
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
  CheckListDetailByHAWBNo: any;
  Remark: string;
  UserId: any;
  CheckListApprovalPDFPath: any;
  BEType: string;
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService) {

    localStorage.removeItem('isLoggedin');
    //localStorage.clear();
    this._unsubscribeall = new Subject();

    this.HWABID = localStorage.getItem('HawbID');
    this.BEType = localStorage.getItem('BEType');
    this.title = 'Check List Detail';

  }

  ngOnInit(): void {

    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.OrgProdId = this.userinfo['OrgProdId'];
    this.UserId = this.userinfo['UserId'];
    this.BEType = localStorage.getItem('BEType');
    this.CheckListApprovalDetailByHAWBID();

  }
  // objTracknTrace: TrackNTrace = new TrackNTrace();
  CheckListApprovalDetailByHAWBID() {

    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/CheckListApproval/GetCheckListDataByHAWBID?OrgProdId='
      + this.OrgProdId + '&HAWBID=' + this.HWABID + '&BEType=' + this.BEType;
    this._http
      .GetData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.CheckListDetailByHAWBNo = data;

          this.CheckListApprovalPDFPath = this.CheckListDetailByHAWBNo['CheckListApprovalPDFPath']
          // this.HWABID = this.CheckListDetail[0]['HawbID']
          // this.spinner.hide();
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

  saveCheckListStatusApproveApprove() {
    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/UCR/UpdateHAWBApprovalStatus?HAWBId=' + this.HWABID + '&ApprovalStatus=Approve&Remark=' + this.Remark + '&OrgProdId=' + this.OrgProdId + '&UserId=' + this.UserId + '&BEType=' + this.BEType;
    // this.req.RequestObject = this.objTracknTrace;
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('Check list approve successfully.');
          this.router.navigate(['/checklist']);
          this.spinner.hide();
        },
        (_error) => {
          this.spinner.hide();
          console.log('error', _error.error.error);
          this.toastr.error('Record not found');

        },
        () => {
          console.log('Call executed LogIn');
        }
      );

  }

  saveCheckListStatusApproveDecline() {
    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/UCR/UpdateHAWBApprovalStatus?HAWBId=' + this.HWABID + '&ApprovalStatus=Approve&Remark=' + this.Remark + '&OrgProdId=' + this.OrgProdId + '&UserId=' + this.UserId;
    // this.req.RequestObject = this.objTracknTrace;
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          //  this.toastr.success(data['ResponseMessage']);
          this.toastr.success('Check list decline successfully.');
          this.router.navigate(['/checklist']);
          this.spinner.hide();
        },
        (_error) => {
          this.spinner.hide();
          console.log('error', _error.error.error);
          this.toastr.error('Record not found');

        },
        () => {
          console.log('Call executed LogIn');
        }
      );

  }

  downloadPDF() {

    window.open(this.CheckListApprovalPDFPath, '_blank');

  }

  exit() {

    console.log("in cancel button");
    this.router.navigate(['/login']);
  }

}
