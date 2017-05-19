import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';

@Injectable()
export class SearchService {
  private searchUrl = 'search';

  constructor(private tokenService: Angular2TokenService) {
  }

  search(text:string): Observable<any[]> {
    return this.tokenService.get(`${this.searchUrl}/${text}`)
      .map((response: Response) => <any[]>response.json())
  }

}
