import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';

import {Comment} from './comment';
import {Photo} from "../photo";

@Injectable()
export class CommentService {
  private albumUrl = 'albums';
  private photosUrl = 'photos';
  private commentsUrl = 'comments';

  constructor(private tokenService: Angular2TokenService) {
  }

  getComments(photo: Photo): Observable<Comment[]> {
    return this.tokenService.get(this.albumUrl + "/" + photo.album_id + "/" + this.photosUrl + "/" + photo.id + "/" + this.commentsUrl)
      .map((response: Response) => <Comment[]>response.json())
  }

  getComment(id: number) {
    return this.tokenService.get(this.commentsUrl + "/" + id + '.json');
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.tokenService.post(this.albumUrl + "/" + comment.photo.album_id + "/" + this.photosUrl + "/" + comment.photo.id + "/" + this.commentsUrl, JSON.stringify(comment)).map((res: Response) => res.json());
  }

  deleteComment(photo: Photo, id: number): Observable<Comment> {
    const url = `${this.albumUrl}/${photo.album_id}/${this.photosUrl}/${photo.id}/${this.commentsUrl}/${id}`;
    return this.tokenService.delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateComment(comment: Comment): Observable<Comment> {
    const url = `${this.albumUrl}/${comment.photo.album_id}/${this.photosUrl}/${comment.photo.id}/${this.commentsUrl}/${comment.id}`;
    return this.tokenService.put(url, JSON.stringify(comment)).map((res: Response) => res.json())
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
