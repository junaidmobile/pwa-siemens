import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { takeUntil } from 'rxjs/operators';
import { Requestmodels } from '../classes/request.models';
import { HttpsService } from '../shared/rest-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { Userdata } from 'app/classfiles/userprofile';
// import { DynamiclabelsService } from 'app/services/dynamiclabels.service';
// import { GetLabels } from 'app/classfiles/GetLabels.model';
// import { NotificationService } from 'app/services/notification-services.service';
// import { CommonServices } from '../../services/common-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style.scss']
})
export class LoginComponent implements OnInit {
  private _unsubscribeall: Subject<any>;
  loginForm: FormGroup;
  submitted = false;
  req: Requestmodels;
  scrHeight: any;
  scrWidth: any;
  show: boolean;
  // GetLabels: GetLabels[] = [];
  // _user: Userdata = new Userdata();

  constructor(public http: HttpClient,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private toastr: ToastrService,
    private _http: HttpsService) {
    localStorage.removeItem('isLoggedin');
    localStorage.clear();
    this._unsubscribeall = new Subject();
    this.show = false;

  }

  ngOnInit() {
    //   this.loginForm = new FormGroup({
    //     EmailId: new FormControl(),
    //     Password: new FormControl()
    //  });
    // this.dynamiclabelservice.GetDynamicLabels('/login', 'en-US');
    this.formsetup();



  }

  formsetup() {
    const _builder = new FormBuilder();
    this.loginForm = _builder.group({});
    this.loginForm.addControl('EmailId', new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$')]));
    this.loginForm.addControl('Password', new FormControl('', [Validators.required]));
  }

  get f() {
    return this.loginForm.controls;
  }

  login(form: any) {

    this.spinner.show();
    this.submitted = true;
    this.loginForm.markAllAsTouched();
    if (form.valid) {
      this.req = new Requestmodels();
      this.req.RequestUrl = 'api/Login/GetUserAuthenticationDetails';

      console.log(this.req.RequestUrl)
      // this._user.LoginName = this.f.EmailId.value;
      // this._user.LoginPassword = this.f.Password.value;
      this.req.RequestObject = { 'LoginName': this.f.EmailId.value, 'LoginPassword': this.f.Password.value };
      this._http
        .PostData(this.req)
        .pipe(takeUntil(this._unsubscribeall))
        .subscribe(
          (data) => {
            console.log(data);
            localStorage.setItem('isLoggedin', 'true');
            sessionStorage.setItem('currentuser', JSON.stringify(data));
            this._router.navigate(['/dashboard']);
           // this.spinner.hide();
          },
          (_error) => {
            this.spinner.hide();
            this.toastr.clear();
           // console.log('error', _error.error.error);
            this.toastr.error('Invalid details.');
          },
          () => {
            console.log('Call executed LogIn');
          }
        );
    } else {
      this.toastr.clear();
      // this.Notification.warning('Invalid details');
      this.toastr.error('Invalid details.');
    }
  }

  // getMessage(controlName: string) {
  //   return this.dynamiclabelservice.getMessage(this.GetLabels, controlName);
  // }

  password() {
    this.show = !this.show;
  }


}
