import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from 'angular2-token';


@Injectable()
export class UserService {
  private usersUrl = 'users';

  constructor(private tokenService: Angular2TokenService) {
  }

  getUser(id: number) {
    return this.tokenService.get(this.usersUrl + "/" + id + '.json');
  }
}
