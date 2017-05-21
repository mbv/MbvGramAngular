import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Photo} from "../album/photo/photo";
import {PhotoService} from "app/album/photo/photo.service";
import {User} from "../user/user";
import {Album} from "../album/album";
import {DialogService} from "ng2-bootstrap-modal";
import {PhotoModalComponent} from "../album/photo/photo-modal.component";

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent implements OnInit {

  photos: Photo[];

  constructor(private photoService: PhotoService,
              private router: Router,
              private dialogService:DialogService) {
  }

  ngOnInit() {
    //let timer = Observable.timer(0, 30000);
   // timer.subscribe(() => this.getFeed());
    this.getFeed()
  }

  getFeed() {
    this.photoService.getPhotoFeed()
      .subscribe(
        photos => this.photos = photos
      );
  }

  goToShow(photo: Photo): void {
    this.dialogService.addDialog(PhotoModalComponent, {photo: photo}, { backdropColor: 'rgba(0, 0, 0, 0.7)', closeByClickingOutside: true});
  }

  goToUser(user: User): void {
    let link = ['/users', user.id];
    this.router.navigate(link);
  }

  goToAlbum(album: Album): void {
    let link = ['/albums', album.id];
    this.router.navigate(link);
  }

}
