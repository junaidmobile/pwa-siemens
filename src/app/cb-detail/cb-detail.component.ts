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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EncrDecrService } from '../environments/EncrDecrService.service';
export class Selectionmodels {
  public description: string;
  public value: string;
  public tablename: string;
  public wherecondition: string;
  public jointablename = '';
  public jointablecondition = '';
  public userid: number;
}

export class HAWBData {
  HAWBId: number;
  HAWBNO: any;
  CustomBrokerCode: any;
  CustomBrokerName: any;
  CustomsBrokerId: any;
  CustomsBrokerIdDesc: any;
  CustomsBrokerBranchId: any;
  CustomsBrokerBranchIdDesc: any;
  OrgProdId: any;
  OrgId: any;
  UserId: any;
  HAWBNo: any;

}

export class SelectionQuery {
  public Query: string;
}
@Component({
  selector: 'app-cb-detail',
  templateUrl: './cb-detail.component.html',
  styleUrls: ['../style.scss']
})
export class CBDetailComponent implements OnInit {
  req: Requestmodels;
  private _unsubscribeall: Subject<any>;
  objCCList: any;
  ddlCBlistBranch: any = '0';
  ddlCBlistList: any = '0';
  HAWBId: any;
  title: string;
  userinfo: any = [];
  OrgProdId: any;
  status: any = 'Pending';
  ccOption: string = 'Select Custom Broker Branch List';
  ccOptionCBBranch: string = 'Select Custom Broker List  ';
  BEType: string;


  loginForm: FormGroup;
  submitted = false;

  show: boolean;
  CheckListDetail: any;
  HWABID: any;
  CheckListDetailByHAWBNo: any;
  Remark: string;
  UserId: any;
  objCCList_CBList: any;
  objCCList_Branch: any;
  CBID: any;
  HouseNo: any;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService,
    private searchFilter: Ng2SearchPipeModule,
    private http: HttpClient, private EncrDecr: EncrDecrService
  ) { this._unsubscribeall = new Subject(); }

  ngOnInit(): void {
    this.HAWBId = localStorage.getItem('HAWBId');
    this.HouseNo = localStorage.getItem('HouseNo');
    this.BEType = localStorage.getItem('BEType');
    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.OrgProdId = this.userinfo['OrgProdId'];
    this.UserId = this.userinfo['UserId'];

    this.CheckListApprovalDetailByHAWBID();

    this.getCBList();
    //this.getCBListBranch();
  }
  EditHAWBobj: HAWBData = new HAWBData();

  cancel() {
    console.log("in cancel button");
    this.router.navigate(['/dashboard']);

  }


  onServiceTypeChange(event) {

    this.CBID = event;
    //this.getCBList()
    this.getCBListBranch(this.CBID);
  }

  getCBList() {

    const mdlBranchType: Selectionmodels = new Selectionmodels();
    mdlBranchType.tablename = 'Master_CustomsBroker';
    mdlBranchType.wherecondition = ` isnull(status,0) = 1 AND OrgProdId = '` + this.OrgProdId + `'   AND isnull(IsDeleted,0)=0 `;

    mdlBranchType.value = 'CHAId';
    mdlBranchType.description = 'CHAName';

    //added an 2 lines  
    let body: SelectionQuery = new SelectionQuery();
    body.Query = this.EncrDecr.set(mdlBranchType);
    this.spinner.show();
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/Generic/GetSelectionData';
    this.req.RequestObject = body;
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.objCCList_CBList = data;
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



  getCBListBranch(CBID: any) {

    const mdlBranchType: Selectionmodels = new Selectionmodels();
    mdlBranchType.tablename = 'Master_CustomsBroker_Branch';

    this.CBID = (this.CBID == undefined || this.CBID == null) ? 0 : this.CBID;

    // mdlBranchType.wherecondition += ` AND CHACode Like '%` + this.CBID + `%'`;

    mdlBranchType.wherecondition = `( CHAId_Parent = '` + this.CBID + `' or ` + this.CBID + `=0) and isnull(status,0) = 1 AND OrgProdId = '` + this.OrgProdId + `' AND isnull(IsDeleted,0)=0 `;


    mdlBranchType.value = 'CHA_branch_ID';
    mdlBranchType.description = 'CHACode';



    let body: SelectionQuery = new SelectionQuery();
    body.Query = this.EncrDecr.set(mdlBranchType);
    this.req.RequestObject = body;
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          //console.log(data);
          this.objCCList_Branch = data;
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


  CheckListApprovalDetailByHAWBID() {

    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/CheckListApproval/GetCheckListDataByHAWBID?OrgProdId='
      + this.OrgProdId + '&HAWBID=' + this.HAWBId + '&BEType=' + this.BEType;
    this._http
      .GetData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.CheckListDetailByHAWBNo = data;

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

  submitCBDetail() {

    if (this.ddlCBlistBranch == '0') {
      this.toastr.error('Please select custom broker branch list.');
      return;
    }
    if (this.ddlCBlistList == '0') {
      this.toastr.error('Please select custom broker list.');
      return;
    }

    this.req = new Requestmodels();
    this.EditHAWBobj.OrgProdId = this.OrgProdId;
    this.req.RequestUrl = 'api/UCR/UpSertHAWBCB';
    this.EditHAWBobj.UserId = this.UserId;
    this.EditHAWBobj.OrgId = '2';
    this.EditHAWBobj.HAWBId = this.HAWBId;
    this.EditHAWBobj.CustomsBrokerId = this.CBID
    this.EditHAWBobj.HAWBNo = this.HouseNo;
    this.EditHAWBobj.CustomsBrokerBranchId = this.ddlCBlistList
    this.EditHAWBobj.CustomBrokerCode = this.CBID;

    this.req.RequestObject = this.EditHAWBobj;

    console.log(this.EditHAWBobj);
    //alert(this.EditOpenPOobj.CC + '' + this.EditOpenPOobj.PC);
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('Custom broker assigned successfully.');
          // this.toastr.success(data['ResponseMessage']);
          this.router.navigate(['/dashboard']);

        },
        (_error) => {
          console.log(_error);
        },
        () => {
          console.log('Call executed PO Updated');
        }
      );
  }

  exit() {

    console.log("in cancel button");
    this.router.navigate(['/login']);
  }

}
