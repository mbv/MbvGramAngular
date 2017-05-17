import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Photo} from './photo';
import {PhotoService} from './photo.service';
import {TagService} from "../../tag/tag.service";
import {Select2OptionData} from "ng2-select2";
import {Tag} from "../../tag/tag";
import {FileUploader} from "ng2-file-upload";
import {Angular2TokenService} from "angular2-token";
import {GlobalVariable} from "../../globals";
import {MyFileUploader} from "./MyFileUploader.class";
import {CookieService} from "angular2-cookie/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'photo-new',
  templateUrl: 'photo-new.component.html',
  styleUrls: ['photo.css']
})
export class PhotoNewComponent {
  photo = new Photo;
  routeId: any;
  public uploader: MyFileUploader;
  submitted: boolean = false;
  completed: boolean = false;
  public tagsData: Observable<Array<Select2OptionData>>;
  public optionsSelectTags: Select2Options;
  public selectedTags: string[];

  constructor(private route: ActivatedRoute,
              private photoService: PhotoService,
              private tagService: TagService,
              private tokenService: Angular2TokenService,
              private cookieService: CookieService) {
    this.uploader = new MyFileUploader(tokenService, cookieService);
  }

  ngOnInit() {
    this.tagsData = this.tagService.getTagList();
    this.optionsSelectTags = {
      multiple: true,
      tags: true,
      closeOnSelect: false,
      tokenSeparators: [','],
    };
    this.selectedTags = [];
    this.routeId = this.route.params.subscribe(
      params => {
        this.photo.album_id = +params['album_id'];
      });
  }

  createPhoto(photo: Photo) {
    this.submitted = true;

    let url = `${GlobalVariable.BASE_API_URL}/albums/${photo.album_id}/photos`;
    let data = {
      album_id: photo.album_id,
      description: photo.description,
      tag_list: JSON.stringify(photo.tag_list),
    };

    this.uploader.upload(url, data).subscribe(
      data => {
        console.log(data);
        this.completed = true;
        return true;
      },
      error => {
        console.log("Error creating photo");
        this.submitted = false;
        return Observable.throw(error);
      });
  }

  changedTags(data: { value: string[] }) {
    this.photo.tag_list = data.value.map(name => ({name: name}));
  }
}
