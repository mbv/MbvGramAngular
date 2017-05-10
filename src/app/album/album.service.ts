import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';

import { Album } from './album';

@Injectable()
export class AlbumService {
  private albumsUrl = 'albums';

  constructor(
    private tokenService: Angular2TokenService
  ){
  }

  getAlbums(): Observable<Album[]> {
    return this.tokenService.get(this.albumsUrl)
      .map((response: Response) => <Album[]>response.json())
  }

  getAlbum(id: number) {
    return this.tokenService.get(this.albumsUrl + "/" + id + '.json');
  }

  createAlbum(album: Album): Observable<Album> {
    return this.tokenService.post(this.albumsUrl, JSON.stringify(album)).map((res: Response) => res.json());
  }

  deleteAlbum(id: number): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.tokenService.delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAlbum(album: Album): Observable<Album> {
    const url = `${this.albumsUrl}/${album.id}`;
    return this.tokenService.put(url, JSON.stringify(album)).map((res: Response) => res.json())
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
