import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Album } from './album';
import { AlbumService } from './album.service';
import {TagService} from "../tag/tag.service";
import {Select2OptionData} from "ng2-select2";
import {Tag} from "../tag/tag";

@Component({
  selector: 'album-new',
  templateUrl: 'album-new.component.html',
  styleUrls: ['album.css']
})
export class AlbumNewComponent {
  album = new Album;
  submitted: boolean = false; //check if the form is submitted
  public tagsData: Observable<Tag[]>;
  public optionsSelectTags: Select2Options;
  public selectedTags: string[];

  constructor(
    private albumService: AlbumService,
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.tagsData = this.tagService.getTags();
    this.optionsSelectTags = {
      multiple: true,
      closeOnSelect: false
    };
    this.selectedTags = [];
  }

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

  changedTags(data: {value: string[]}) {
    this.album.tag_ids = data.value;
  }
}
