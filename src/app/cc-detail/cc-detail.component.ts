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
import * as jquery from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as $ from "jquery";
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
export class SelectionQuery {
  public Query: string;
}
@Component({
  selector: 'app-cc-detail',
  templateUrl: './cc-detail.component.html',
  styleUrls: ['../style.scss']
})


export class CCDetailComponent implements OnInit {
  req: Requestmodels;
  private _unsubscribeall: Subject<any>;
  objCCList: any;
  ddlCClist: any = '0';
  HAWBId: string;
  title: string;
  userinfo: any = [];
  OrgProdId: any;
  status: any = 'Pending';
  ccOption: string = 'Select Cost Center';
  loginForm: FormGroup;
  submitted = false;

  show: boolean;
  CheckListDetail: any;
  HWABID: any;
  CheckListDetailByHAWBNo: any;
  Remark: string;
  UserId: any;
  selval: any;
  BEType:string;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService,
    private searchFilter: Ng2SearchPipeModule,
    private http: HttpClient, private EncrDecr: EncrDecrService


  ) {

    this._unsubscribeall = new Subject();

  }

  ngOnInit(): void {
    this.BEType = localStorage.getItem('BEType');
    this.HAWBId = localStorage.getItem('HAWBId');
    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.OrgProdId = this.userinfo['OrgProdId'];
    this.UserId = this.userinfo['UserId'];
    jquery('#idCC').select2();
    $('#idCC').on('change', function () {
      let val1 = $('#idCC').val();
      this.ddlCClist = val1;
    });

    this.CheckListApprovalDetailByHAWBID();

    //initialize select2 to particular input
    this.getCCList();


  }

  cancel() {
    console.log("in cancel button");
    this.router.navigate(['/dashboard']);

  }


  getCCList() {

    
    const mdlCostCenter: Selectionmodels = new Selectionmodels();
    mdlCostCenter.tablename = 'Master_CostCenter';
    mdlCostCenter.wherecondition = ` Isnull(IsActive,0) = 1   AND isnull(IsDeleted,0)=0 `;

    // if (inputTerm !== '') {
    //   mdlCostCenter.wherecondition += ` AND CostCenterName Like '%` + inputTerm + `%'`;
    // }
    // if (filterid !== '-1' && filterid !== '') {
    //   mdlCostCenter.wherecondition += ` AND CostCenterCode = '` + filterid + `'`;
    // }

    mdlCostCenter.value = 'CostCenterCode';
    mdlCostCenter.description = 'CostCenterName';

    this.spinner.show();
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/Generic/GetSelectionData';
    let body: SelectionQuery = new SelectionQuery();
    body.Query = this.EncrDecr.set(mdlCostCenter);
    this.req.RequestObject = body;
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          this.objCCList = data;
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
    debugger
    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/CheckListApproval/GetCheckListDataByHAWBID?OrgProdId='
      + this.OrgProdId + '&HAWBID=' + this.HAWBId+ '&BEType=' + this.BEType;
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

  submitCCDetail() {
    debugger

    if ($('#idCC').val() == '0') {
      this.toastr.error('Please select Cost Center.');
      return;
    }

    this.spinner.show();
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/UCR/UpSertOpenPO';

    this.req.RequestObject = '{"POId":0,"PONO":"","CCDescription":"","PCDescription":"","IncoTerms":"","IncoTermsLoc":"","CC":"' + $('#idCC').val() + '","PC":"","Vendor":"","WBSElement":"","POStatus":"O","OrgProdId":' + this.OrgProdId + ',"UserId":' + this.UserId + ',"OrgId":2,"HAWBId":"' + this.HAWBId + '"}';
    this._http
      .PostData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {
          console.log(data);
          // this.toastr.success(data['ResponseMessage']);
          this.toastr.success('Cost centre assigned successfully');
          this.router.navigate(['/dashboard']);
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

  exit() {

    console.log("in cancel button");
    this.router.navigate(['/login']);
  }

}
