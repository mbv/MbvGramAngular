import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';

import {Tag} from './tag';
import {Select2OptionData} from "ng2-select2";

@Injectable()
export class TagService {
  headers: Headers;
  options: RequestOptions;
  private albumsUrl = 'tags';

  constructor(private http: Http,
              private tokenService: Angular2TokenService) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getTags(): Observable<Tag[]> {
    return this.tokenService.get(this.albumsUrl)
      .map((response: Response) => <Tag[]>response.json())
  }

  getTagList(): Observable<Array<Select2OptionData>> {
    return this.tokenService.get(this.albumsUrl)
      .map((response: Response) => <Array<Select2OptionData>>(<Tag[]>response.json()).map((tag) => ({id: tag.name, text: tag.name})))
  }

  getTag(id: number) {
    return this.tokenService.get(this.albumsUrl + "/" + id + '.json');
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.tokenService.post(this.albumsUrl, JSON.stringify(tag),
      this.options).map((res: Response) => res.json());
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
