import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';

import { Album } from './album';

@Injectable()
export class AlbumService {
  headers: Headers;
  options: RequestOptions;
  private albumsUrl = 'albums';

  constructor(
    private http: Http,
    private tokenService: Angular2TokenService
  ){
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getAlbums(): Observable<Album[]> {
    return this.tokenService.get(this.albumsUrl)
      .map((response: Response) => <Album[]>response.json())
  }

  getAlbum(id: number) {
    return this.tokenService.get(this.albumsUrl + "/" + id + '.json');
  }

  createAlbum(project: Album): Observable<Album> {
    return this.tokenService.post(this.albumsUrl, JSON.stringify(project),
      this.options).map((res: Response) => res.json());
  }

  deleteAlbum(id: number): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.tokenService.delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAlbum(project: Album): Observable<Album> {
    const url = `${this.albumsUrl}/${project.id}`;
    return this.tokenService.put(url, JSON.stringify(project),
      this.options).map((res: Response) => res.json())
      .catch(this.handleError);
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
