import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Album } from './album';
import { AlbumService } from './album.service';

@Component({
  selector: 'album-show',
  templateUrl: 'album-show.component.html',
  styleUrls: ['album.css']
})
export class AlbumShowComponent implements OnInit {

  id: number;
  routeId: any;
  errorMessage: any;
  returnUrl: string;
  editBtnClicked: boolean = false;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  @Input()
  album: Album;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/albums';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      });
    let albumRequest = this.route.params
      .flatMap((params: Params) =>
        this.albumService.getAlbum(+params['id']));

    albumRequest.subscribe(response => this.album = response.json());
  }

  deleteAlbum(album: Album) {
    this.albumService.deleteAlbum(this.album.id)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => this.errorMessage = error
      );
  }

  updateAlbum(album: Album) {
    this.editBtnClicked = true;
    this.albumService.updateAlbum(album)
      .subscribe(
        data => { return true },
        error => {
          console.log("Error Editing Album");
          return Observable.throw(error);
        });
  }

  onUpdateClicked() {
    this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
    window.location.reload();
  }


}
