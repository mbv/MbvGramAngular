import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Album} from './album';
import {AlbumService} from './album.service';
import {Tag} from "../tag/tag";
import {TagService} from "../tag/tag.service";
import {Select2OptionData} from "ng2-select2";
import {PhotoService} from "./photo/photo.service";
import {Photo} from "./photo/photo";

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
  public tagsData: Observable<Array<Select2OptionData>>;
  public optionsTagsSelect: Select2Options;
  public selectedTags: Observable<string[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private albumService: AlbumService,
              private photoService: PhotoService,
              private tagService: TagService) {
  }

  @Input()
  album: Album;

  photos: Photo[];

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/albums';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getPhotos();
      });
    let albumRequest = this.route.params
      .flatMap((params: Params) =>
        this.albumService.getAlbum(+params['id']));

    albumRequest.subscribe(response => {
      this.album = response.json();
    });
    this.tagsData = this.tagService.getTagList();

    this.selectedTags = Observable.create((obs) => {
      this.tagsData.subscribe(() => {
        obs.next(this.album.tag_list);
        obs.complete();
      });
    });

    this.optionsTagsSelect = {
      multiple: true,
      tags: true,
      closeOnSelect: false,
      tokenSeparators: [','],
    };
  }
  getPhotos() {
    this.photoService.getPhotos(this.id)
      .subscribe(
        photos => this.photos = photos
      );
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
        data => {
          return true
        },
        error => {
          console.log("Error Editing Album");
          return Observable.throw(error);
        });
  }


  goToShowPhoto(photo: Photo): void {
    let link = ['/albums', photo.album_id, 'photos', photo.id];
    this.router.navigate(link);
  }

  onUpdateClicked() {
    //this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
    // window.location.reload();
  }


  changedTags(data: { value: string[] }) {
    this.album.tag_list = data.value;
  }
}
