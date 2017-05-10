import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Album } from './album';
import { AlbumService } from './album.service';
import {Tag} from "../tag/tag";
import {TagService} from "../tag/tag.service";

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
  public tagsData: Observable<Tag[]>;
  public optionsSelectTags: Select2Options;
  public selectedTags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private tagService: TagService
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

    albumRequest.subscribe(response => {
      this.album = response.json();
     /* this.selectedTags = Observable.create((obs) => {
        obs.next(this.album.tag_list);
        obs.complete();
      });*/
    });
    this.tagsData = this.tagService.getTags();
    this.optionsSelectTags = {
      multiple: true,
      tags: true,
      closeOnSelect: false
    };
    this.selectedTags = ["test"];
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

  editAlbum(album: Album) {
    this.editBtnClicked = true;
  }
  updateAlbum(album: Album) {
    this.albumService.updateAlbum(album)
      .subscribe(
        data => { return true },
        error => {
          console.log("Error Editing Album");
          return Observable.throw(error);
        });
  }

  onUpdateClicked() {
    //this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
   // window.location.reload();
  }


  changedTags(data: {value: string[]}) {
    this.album.tag_list = data.value;
  }
}
