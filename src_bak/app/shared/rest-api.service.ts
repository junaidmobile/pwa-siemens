import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.component';
import { Requestmodels } from '../classes/request.models';


@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  // Id: string = '0';
  rowdata: any = '0';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  Username: any = '';
  private apiUrl = environment.ApiURL;
  constructor(private _http: HttpClient) {
  }
  postFile(req: Requestmodels, fileToUpload: File, DocumentData: any): Observable<boolean> {

    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    for (let [key, value] of Object.entries(DocumentData)) {
      console.log(key + ':' + value);
      if (value != undefined) {
        formData.append(key, value.toString());
      }
    }

    return this._http
      .post(this.apiUrl + req.RequestUrl, formData)
      .pipe(map((response: any) => response.json()));
  }
  public PostData(req: Requestmodels): Observable<any> {
    if (req.RequestObject !== undefined && req.RequestObject !== null && req.RequestObject !== '') {
      return this._http.post<any>(this.apiUrl + req.RequestUrl, req.RequestObject, {
        headers: this.headers
      });
    } else {
      return this._http.post<any>(this.apiUrl + req.RequestUrl, {
        headers: this.headers
      });
    }
  }
  public downLoadFile(req: Requestmodels) {
    var body = req.RequestObject;
    return this._http.post(this.apiUrl + req.RequestUrl, body, { responseType: 'blob', headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }
  //public PostDataFile(req: Requestmodels, options?: {}): Observable<Blob> {
  //  if (req.RequestObject !== undefined && req.RequestObject !== null && req.RequestObject !== '') {
  //return this._http.post(this.apiUrl + req.RequestUrl, req.RequestObject, {
  //      headers: this.headers
  //});
  //  } else {
  //    return this._http.post<any>(this.apiUrl + req.RequestUrl, {
  //      headers: this.headers
  //    });
  //  }
  //}

  public PostDataPromise(req: Requestmodels): Promise<any> {
    if (req.RequestObject !== undefined && req.RequestObject !== null && req.RequestObject !== '') {
      return this._http
        .post<any>(this.apiUrl + req.RequestUrl, req.RequestObject, {
          headers: this.headers
        })
        .toPromise();
    } else {
      return this._http
        .post<any>(this.apiUrl + req.RequestUrl, {
          headers: this.headers
        })
        .toPromise();
    }
  }

  public PostDataAny(req: Requestmodels): Observable<any> {
    if (req.RequestObject !== undefined && req.RequestObject !== null && req.RequestObject !== '') {
      return this._http.post<any>(this.apiUrl + req.RequestUrl, req.RequestObject, {
        headers: this.headers
      });
    } else {
      return this._http.post<any>(this.apiUrl + req.RequestUrl, {
        headers: this.headers
      });
    }
  }

  public PostDataPromiseAny(req: Requestmodels): Promise<any> {
    if (req.RequestObject !== undefined && req.RequestObject !== null && req.RequestObject !== '') {
      return this._http
        .post<any>(this.apiUrl + req.RequestUrl, req.RequestObject, {
          headers: this.headers
        })
        .toPromise();
    } else {
      return this._http
        .post<any>(this.apiUrl + req.RequestUrl, {
          headers: this.headers
        })
        .toPromise();
    }
  }

  public GetData(req: Requestmodels): Observable<any> {
    return this._http.get(this.apiUrl + req.RequestUrl, {
      headers: this.headers
    });
  }

  public GetDataPromise(req: Requestmodels): Promise<any> {
    return this._http
      .get<any>(this.apiUrl + req.RequestUrl, {
        headers: this.headers
      })
      .toPromise();
  }

  public GetDataAny(req: Requestmodels): Observable<any> {
    return this._http.get<any>(this.apiUrl + req.RequestUrl, {
      headers: this.headers
    });
  }

  public GetDataPromiseAny(req: Requestmodels): Promise<any> {
    return this._http
      .get<any>(this.apiUrl + req.RequestUrl, {
        headers: this.headers
      })
      .toPromise();
  }
}
