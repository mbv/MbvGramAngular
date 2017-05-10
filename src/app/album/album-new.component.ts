import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Album } from './album';
import { AlbumService } from './album.service';

@Component({
  selector: 'album-new',
  templateUrl: 'album-new.component.html',
  styleUrls: ['album.css']
})
export class AlbumNewComponent {
  album = new Album;
  submitted: boolean = false; //check if the form is submitted

  constructor(
    private albumService: AlbumService
  ) {}

  createAlbum(album: Album) {
    this.submitted = true;
    this.albumService.createAlbum(album)
      .subscribe(
        data => { return true },
        error => {
          console.log("Error creating album");
          return Observable.throw(error);
        });
  }
}
