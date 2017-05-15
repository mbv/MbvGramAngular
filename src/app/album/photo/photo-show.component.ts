import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Photo} from './photo';
import {PhotoService} from './photo.service';
import {Tag} from "../../tag/tag";
import {TagService} from "../../tag/tag.service";
import {Select2OptionData} from "ng2-select2";
import {Comment} from './comments/comment';
import {CommentService} from "./comments/comment.service";
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'photo-show',
  templateUrl: 'photo-show.component.html',
  styleUrls: ['photo.css']
})
export class PhotoShowComponent implements OnInit {

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
              private photoService: PhotoService,
              private commentService: CommentService,
              private tagService: TagService,
              private tokenService: Angular2TokenService,) {
  }

  @Input()
  photo: Photo;

  comments: Comment[];

  comment = new Comment;
  submitted: boolean = false;
  completed: boolean = false;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/photos';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      });
    let photoRequest = this.route.params
      .flatMap((params: Params) =>
        this.photoService.getPhoto(+params['id']));

    photoRequest.subscribe(response => {
      this.photo = response.json();
      this.getComments();
    });
    this.tagsData = this.tagService.getTagList();

    this.selectedTags = Observable.create((obs) => {
      this.tagsData.subscribe(() => {
        obs.next(this.photo.tag_list);
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

  getComments() {
    this.commentService.getComments(this.photo)
      .subscribe(
        comments => this.comments = comments
      );
  }

  createComment(comment: Comment) {
    this.submitted = true;

    comment.photo = this.photo;
    comment.user_id = this.tokenService.currentUserData.id;

    this.commentService.createComment(comment)
      .subscribe(
        data => {
          this.getComments();
          this.comment = new Comment;
          this.submitted = false;
          return true
        },
        error => {
          console.log("Error creating comment");
          return Observable.throw(error);
        });
  }


  deleteComment(comment: Comment) {
    this.commentService.deleteComment(this.photo, comment.id)
      .subscribe(
        data => {
          this.getComments();
          return true
        },
        error => this.errorMessage = error
      );
  }


  deletePhoto(photo: Photo) {
    this.photoService.deletePhoto(this.photo.album_id, this.photo.id)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => this.errorMessage = error
      );
  }

  editPhoto(photo: Photo) {
    this.editBtnClicked = true;
  }

  updatePhoto(photo: Photo) {
    this.photoService.updatePhoto(photo)
      .subscribe(
        data => {
          return true
        },
        error => {
          console.log("Error Editing Photo");
          return Observable.throw(error);
        });
  }

  onUpdateClicked() {
    //this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
    // window.location.reload();
  }


  changedTags(data: { value: string[] }) {
    this.photo.tag_list = data.value;
  }
}
