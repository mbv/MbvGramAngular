import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from './user';
import {UserService} from './user.service';
import {Tag} from "../tag/tag";
import {TagService} from "../tag/tag.service";
import {Select2OptionData} from "ng2-select2";
import {Album} from "../album/album";
import {AlbumService} from "../album/album.service";

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
              private albumService: AlbumService,) {
  }

  @Input()
  user: User;
  albums: Album[];


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getUser(+params['id']);
        this.getAlbums(+params['id']);
      });

  }

  getUser(id:number):void {
    this.userService.getUser(id).subscribe(response => {
      this.user = response.json();
    });
  }

  followUser(user:User) {
    this.userService.followUser(user.id) .subscribe(
      u => this.getUser(user.id)
    );
  }

  unfollowUser(user:User) {
    this.userService.unfollowUser(user.id) .subscribe(
      u => this.getUser(user.id)
    );
  }

  getAlbums(user_id:number) {
    this.albumService.getUserAlbums(user_id)
      .subscribe(
        albums => this.albums = albums
      );
  }

  goToShowAlbum(album: Album): void {
    let link = ['/albums', album.id];
    this.router.navigate(link);
  }


}
