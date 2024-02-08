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
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['../style.scss'],
  animations: [routerTransition()]
})
export class ChecklistComponent implements OnInit {
  title: string;
  userinfo: any = [];
  OrgProdId: any;
  status: any = 'Pending';
  private _unsubscribeall: Subject<any>;
  loginForm: FormGroup;
  submitted = false;
  req: Requestmodels;
  show: boolean;
  CheckListDetail: any = [];
  HWABID: any;
  dtavalues: any = [];
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private _http: HttpsService) {
    localStorage.removeItem('isLoggedin');
    localStorage.clear();
    this._unsubscribeall = new Subject();

    this.title = 'BoE Checklist';
  }

  ngOnInit(): void {

    this.userinfo = JSON.parse(sessionStorage.getItem('currentuser'));
    this.OrgProdId = this.userinfo['OrgProdId'];
    this.CheckListApproval();
  }



  CheckListApproval() {

    this.spinner.show();
    this.submitted = true;
    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/CheckListApproval/GetPendingApproval?OrgProdId='
      + this.OrgProdId + '&status=' + this.status;
    this._http
      .GetData(this.req)
      .pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (data) => {

          console.log(data);
          if (data != '') {
            this.CheckListDetail = data;

            this.dtavalues = data;


            //CheckListApprovalStatus

            // this.HWABID = this.CheckListDetail[0]['HawbID']

            //   sessionStorage.setItem('currentuser', JSON.stringify(data));
            //   this._router.navigate(['/dashboard']);
            this.spinner.hide();

          }
          else {

            this.spinner.hide();
            this.toastr.error('No record found to display.');
          }

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

  goChkDetail(HWABID,BEType) {

    localStorage.setItem('HawbID', HWABID);
    localStorage.setItem('BEType', BEType);
    this.router.navigate(['/checklistdetail']);
  }

  exit() {
    this.router.navigate(['/login']);
  }

}
