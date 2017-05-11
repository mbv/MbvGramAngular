import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Photo } from './photo';
import { PhotoService } from './photo.service';
import {TagService} from "../../tag/tag.service";
import {Select2OptionData} from "ng2-select2";
import {Tag} from "../../tag/tag";
import {FileUploader} from "ng2-file-upload";
import {Angular2TokenService} from "angular2-token";
import {Headers} from "ng2-file-upload";


const URL = 'http://localhost:3000/albums/2/photos';

@Component({
  selector: 'photo-new',
  templateUrl: 'photo-new.component.html',
  styleUrls: ['photo.css']
})
export class PhotoNewComponent {
  photo = new Photo;
  public uploader:FileUploader = new FileUploader({url: URL});
  submitted: boolean = false; //check if the form is submitted
  public tagsData: Observable<Array<Select2OptionData>>;
  public optionsSelectTags: Select2Options;
  public selectedTags: string[];

  constructor(
    private photoService: PhotoService,
    private tagService: TagService,
    private tokenService: Angular2TokenService
  ) {}

  ngOnInit() {
    this.tagsData = this.tagService.getTagList();
    this.optionsSelectTags = {
      multiple: true,
      tags: true,
      closeOnSelect: false,
      tokenSeparators: [','],
    };
    this.selectedTags = [];
    this.photo.album_id = 2;

    let headers = this.tokenService.currentAuthHeaders;
    headers.forEach((values, name) => {
      console.log(name, values);
    });
  }

  createPhoto(photo: Photo) {
    this.submitted = true;

    let headers = this.tokenService.currentAuthHeaders;
    headers.forEach((name, value) => {
      ({name: name, value: value[0]})
    });




    this.uploader.setOptions({

    });

    /*this.photoService.createPhoto(photo)
      .subscribe(
        data => { return true },
        error => {
          console.log("Error creating photo");
          return Observable.throw(error);
        });*/
  }

  changedTags(data: {value: string[]}) {
    this.photo.tag_list = data.value;
  }
}
