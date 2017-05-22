import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Album } from './album';
import { AlbumService } from './album.service';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album.css']
})
export class AlbumListComponent implements OnInit {

  albums: Album[];

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums()
      .subscribe(
        albums => this.albums = albums
      );
  }

  goToShow(album: Album): void {
    let link = ['/albums', album.id];
    this.router.navigate(link);
  }

}
