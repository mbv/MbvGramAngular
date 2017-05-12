import {FileItem, FileUploader, Headers, ParsedResponseHeaders} from "ng2-file-upload";
import {Angular2TokenService} from "angular2-token";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {CookieService} from "angular2-cookie/core";

export class MyFileUploader extends FileUploader {
  private _uploadedObserver : Observer<string>;


  constructor(private tokenService: Angular2TokenService, private cookieService:CookieService) {
    super({});
  }


  onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this._uploadedObserver.next(response);
    this.setAuthData(headers);
    return super.onCompleteItem(item, response, status, headers);
  }


  onCompleteAll(): any {
    this._uploadedObserver.complete();
    return super.onCompleteAll();
  }

  public upload(url : string, data: {[key: string]: any; }): Observable<string> {
    let options = {
      url: url,
      headers: this.getAuthHeaders(),
      additionalParameter : data,
    };

    this.setOptions(options);

    this.uploadAll();
    return Observable.create((observer) => {
      this._uploadedObserver = observer;
    });
  }

  private getAuthHeaders():Array<Headers> {
    let authHeaders = [];
    this.tokenService.currentAuthHeaders.forEach((value, name) => {
      authHeaders.push({name: name, value: value[0]})
    });

    authHeaders.push({name: 'X-XSRF-TOKEN', value: this.cookieService.get('XSRF-TOKEN')});
    return authHeaders
  }

  private setAuthData(headers: ParsedResponseHeaders):void {
    let authHeaders = {
      accessToken: headers['access-token'],
      client: headers['client'],
      expiry: headers['expiry'],
      tokenType: headers['token-type'],
      uid: headers['uid']
    };
    this.tokenService["setAuthData"](authHeaders);
  }
}
