import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';

import {Photo} from './photo';

@Injectable()
export class PhotoService {
  private albumsUrl = 'albums';
  private photosUrl = 'photos';

  constructor(private tokenService: Angular2TokenService) {
  }

  getPhotos(album_id: number): Observable<Photo[]> {
    return this.tokenService.get(this.albumsUrl + "/" + album_id + "/" + this.photosUrl)
      .map((response: Response) => <Photo[]>response.json())
  }

  getPhoto(album_id: number, id: number) {
    return this.tokenService.get(this.albumsUrl + "/" + album_id + this.photosUrl + "/" + id + '.json');
  }

  createPhoto(photo: Photo): Observable<Photo> {
    return this.tokenService.post(this.albumsUrl + "/" + photo.album_id + "/" + this.photosUrl, JSON.stringify(photo)).map((res: Response) => res.json());
  }

  deletePhoto(album_id: number, id: number): Observable<Photo> {
    const url = `${this.albumsUrl}/${album_id}/${this.photosUrl}/${id}`;
    return this.tokenService.delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePhoto(photo: Photo): Observable<Photo> {
    const url = `${this.albumsUrl}/${photo.album_id}/${this.photosUrl}/${photo.id}`;
    return this.tokenService.put(url, JSON.stringify(photo)).map((res: Response) => res.json())
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
