import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginLog } from '../environments/LoginLog';
import { takeUntil } from 'rxjs/operators';
import { Requestmodels } from '../classes/request.models';
import { HttpsService } from '../shared/rest-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EncrDecrService } from '../environments/EncrDecrService.service';
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
  UserKey: any;

  ipAddress: any;
  ipCity: any;
  ipCountry: any;
  ipOrg: any;
  _LoginLog: LoginLog = new LoginLog();
  // GetLabels: GetLabels[] = [];
  // _user: Userdata = new Userdata();
  EncKeysValue: any;
  constructor(public http: HttpClient,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private toastr: ToastrService,
    private _http: HttpsService, private EncrDecr: EncrDecrService) {
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
    this.getIP();
    this.formsetup();
 
    // this.dynamiclabelservice.GetDynamicLabels('/login', 'en-US');
    //  this.formsetup();

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


  // async login(form: any) {

  //   this.submitted = true;
  //   await this.GetKeyValue();

  //   this.loginForm.markAllAsTouched();
  //   if (form.valid) {

  //     this.req = new Requestmodels();
  //     this.req.RequestUrl = 'api/Login/GetUserAuthenticationDetails';
  //     // this._user.LoginName = this.f.EmailId.value;
  //     // this._user.LoginPassword = this.f.Password.value;
  //     // this.req.RequestObject = this._user;
  //     this._LoginLog.LoginName = this.f.EmailId.value;


  //     //  this._LoginLog.LoginPassword = this.f.Password.value;
  //     this._LoginLog.LoginPassword = this.EncrDecr.EncryptUsingRandomKey(this.f.Password.value + '`' + this.ipAddress, this.UserKey);
  //     //==
  //     this._LoginLog.IpAddress = this.ipAddress;
  //     this._LoginLog.IpCity = this.ipCity;
  //     this._LoginLog.IpCountry = this.ipCountry;
  //     this._LoginLog.IpOrg = this.ipOrg;
  //     //==
  //     this.req.RequestObject = this._LoginLog;
  //     this._http
  //       .PostData(this.req)
  //       .pipe(takeUntil(this._unsubscribeall))
  //       .subscribe(
  //         (data) => {
  //           console.log(data);
  //           localStorage.setItem('isLoggedin', 'true');
  //           sessionStorage.setItem('currentuser', JSON.stringify(data));
  //           this._router.navigate(['/dashboard']);
  //           // this.spinner.hide();
  //         },
  //         (_error) => {
  //           this.spinner.hide();
  //           this.toastr.clear();
  //           console.log('error', _error.error.error);
  //           this.toastr.error('Invalid details.');
  //         },
  //         () => {
  //           console.log('Call executed LogIn');
  //         }
  //       );
  //   } else {
  //     this.toastr.error('Invalid details.');
  //   }

  // }

  async login(form: any) {



    this.submitted = true;
    await this.GetKeyValueNew(form);
  }


  async GetKeyValue() {

    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/Login/GetUserKey?loginname=' + this.f.EmailId.value;
    this.req.RequestObject = '';
    await this._http
      .PostDataPromise(this.req)
      .then(
        (data) => {
          if (data != null) {

            this.UserKey = data;
          }
          if (this.UserKey == null || this.UserKey == "" || this.UserKey == "0") {
            this.UserKey = "00";
          }
        },
        (_error) => {
        }
      );
  }


 

  // async GetKeyValueNew() {
  //   this.req = new Requestmodels();
  //   this.req.RequestUrl = 'api/Login/GetUserKey?loginname=' + this.f.EmailId.value;
  //   this.req.RequestObject = '';
  //   await this._http
  //     .GetData(this.req)
  //     .pipe(takeUntil(this._unsubscribeall))
  //     .subscribe(
  //       (data) => {
  //         if (data.length > 0) {
  //           this.UserKey = data[0].EmailTO;
  //         } else {
  //         }
  //       },
  //       (_error) => {
  //         console.log(_error);
  //       },
  //       () => {
  //         console.log('Call executed State Fill');
  //       }
  //     );
  // }

  async GetKeyValueNew(form: any) {



    this.req = new Requestmodels();
    this.req.RequestUrl = 'api/Login/GetUserKeyDeatils?loginname=' + this.f.EmailId.value;
    this.req.RequestObject = '';
    await this._http
      .PostDataPromise(this.req)
      .then(
        (data) => {
          if (data.length > 0) {



            this.UserKey = data[0].UserKey;

            this.EncKeysValue = data[0].KeyValue;
            sessionStorage.setItem('labeldata', this.EncKeysValue);
            this.logincall(form, this.EncKeysValue);
            //GlobalComponent.codeendc = this.EncKeysValue;
            // this._http.setvalue(this.EncKeysValue);
          } else {

            this.toastr.error('Entered Email or Password is incorrect');

            // this.Notification.error("Entered Email or Password is incorrect");
          }
        },
        (_error) => {
          console.log(_error);
        },



      );
  }



  async logincall(form: any, EncKeysValueAssign: any) {
    this.loginForm.markAllAsTouched();
    if (form.valid) {
      this.req = new Requestmodels();
      this.req.RequestUrl = 'api/Login/GetUserAuthenticationDetails';
      // this._user.LoginName = this.f.EmailId.value;
      // this._user.LoginPassword = this.f.Password.value;
      // this.req.RequestObject = this._user;
      this._LoginLog.LoginName = this.f.EmailId.value;
      //this._LoginLog.LoginName = 'admimmmm';
      //  this._LoginLog.LoginPassword = this.f.Password.value;
      this._LoginLog.LoginPassword = this.EncrDecr.EncryptUsingRandomKey(this.f.Password.value + '`' + this.ipAddress, this.UserKey, EncKeysValueAssign);
      //==
      this._LoginLog.IpAddress = this.ipAddress;
      this._LoginLog.IpCity = this.ipCity;
      this._LoginLog.IpCountry = this.ipCountry;
      this._LoginLog.IpOrg = this.ipOrg;
      //==
      this.req.RequestObject = this._LoginLog;
      this._http
        .PostData(this.req)
        .pipe(takeUntil(this._unsubscribeall))
        .subscribe(
          (data) => {

            localStorage.setItem('isLoggedin', 'true');

            // localStorage.setItem('isLoggedin', this.EncrDecr.set('true'));
            localStorage.setItem('isChangePassword', data.IsChangePassword);
            data.LoginPassword = null;
            sessionStorage.setItem('currentuser', JSON.stringify(data));
            // sessionStorage.setItem('currentuser', this.EncrDecr.encryptData(EncKeysValueAssign, JSON.stringify(data)));

            this._router.navigate(['/dashboard']);
            //this._router.navigate(['/homedashboard']);
          },
          (_error) => {
            console.log('error', _error.error.error);
            //this.Notification.error("Entered Email or Password is incorrect");
            this.toastr.error('Entered Email or Password is incorrect');
          },
          () => {
            console.log('Call executed LogIn');
          }
        );
    } else {
      // this.Notification.warning('Invalid details');
      this.toastr.error('Invalid details');
    }
  }



  getIP() {
    this._http.GetIPaddress().pipe(takeUntil(this._unsubscribeall))
      .subscribe(
        (res: any) => {
          if (res != null) {
            this.ipAddress = res.ip;
            this.ipCity = res.city;
            this.ipCountry = res.country_name;
            this.ipOrg = res.org;
          }
          else {
            this.ipAddress = "";
            this.ipCity = "";
            this.ipCountry = "";
            this.ipOrg = "";
          }
        },
        (_error) => {
          this.ipAddress = "";
          this.ipCity = "";
          this.ipCountry = "";
          this.ipOrg = "";
        },
        () => {

        }
      );
  }

  // login(form: any) {

  //   this.spinner.show();
  //   this.submitted = true;
  //   this.loginForm.markAllAsTouched();
  //   if (form.valid) {
  //     this.req = new Requestmodels();
  //     this.req.RequestUrl = 'api/Login/GetUserAuthenticationDetails';

  //     console.log(this.req.RequestUrl)
  //     // this._user.LoginName = this.f.EmailId.value;
  //     // this._user.LoginPassword = this.f.Password.value;
  //     this.req.RequestObject = { 'LoginName': this.f.EmailId.value, 'LoginPassword': this.f.Password.value };
  //     this._http
  //       .PostData(this.req)
  //       .pipe(takeUntil(this._unsubscribeall))
  //       .subscribe(
  //         (data) => {
  //           console.log(data);
  //           localStorage.setItem('isLoggedin', 'true');
  //           sessionStorage.setItem('currentuser', JSON.stringify(data));
  //           this._router.navigate(['/dashboard']);
  //          // this.spinner.hide();
  //         },
  //         (_error) => {
  //           this.spinner.hide();
  //           this.toastr.clear();
  //          // console.log('error', _error.error.error);
  //           this.toastr.error('Invalid details.');
  //         },
  //         () => {
  //           console.log('Call executed LogIn');
  //         }
  //       );
  //   } else {
  //     this.toastr.clear();
  //     // this.Notification.warning('Invalid details');
  //     this.toastr.error('Invalid details.');
  //   }
  // }

  // getMessage(controlName: string) {
  //   return this.dynamiclabelservice.getMessage(this.GetLabels, controlName);
  // }

  password() {
    this.show = !this.show;
  }


}
