import { Component } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {GlobalVariable} from "./globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: GlobalVariable.BASE_API_URL,
      signOutFailedValidate: true,
    });
  }
}
