import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router,
              private tokenService: Angular2TokenService,) {
  }

  ngOnInit() {
    let user = this.tokenService.currentUserData;
    let link = ['/users', user.id];
    this.router.navigate(link);
  }
}
