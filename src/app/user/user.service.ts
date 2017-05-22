import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';
import {Observable} from "rxjs/Observable";
import {User} from "./user";


@Injectable()
export class UserService {
  private usersUrl = 'users';

  constructor(private tokenService: Angular2TokenService) {
  }

  getUser(id: number) {
    return this.tokenService.get(this.usersUrl + "/" + id + '.json');
  }

  followUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/follow`;
    let data = JSON.stringify({id: id});
    return this.tokenService.patch(url, data)
      .catch(this.handleError);
  }

  unfollowUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/unfollow`;
    let data = JSON.stringify({id: id});
    return this.tokenService.patch(url, data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
