import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from './user';
import {UserService} from './user.service';
import {Tag} from "../tag/tag";
import {TagService} from "../tag/tag.service";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'user-show',
  templateUrl: 'user-show.component.html',
  styleUrls: ['user.css']
})
export class UserShowComponent implements OnInit {

  id: number;
  routeId: any;
  errorMessage: any;
  returnUrl: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private tagService: TagService) {
  }

  @Input()
  user: User;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      });
    let userRequest = this.route.params
      .flatMap((params: Params) =>
        this.userService.getUser(+params['id']));

    userRequest.subscribe(response => {
      this.user = response.json();
    });
  }

  followUser(user:User) {
    this.userService.followUser(user.id);
  }


}
