import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Photo} from "./photo";
import {CommentService} from "./comments/comment.service";
import {Comment} from './comments/comment';
import {Observable} from "rxjs";
import {Angular2TokenService} from "angular2-token";
export interface PhotoModalModel {
  photo:Photo;
}
@Component({
  selector: 'confirm',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['photo-modal.css']
})
export class PhotoModalComponent extends DialogComponent<PhotoModalModel, boolean> implements PhotoModalModel, OnInit {
  photo: Photo;
  comments: Comment[];

  comment = new Comment;
  submitted: boolean = false;
  errorMessage: any;

  constructor(dialogService: DialogService, private commentService: CommentService, private tokenService: Angular2TokenService,) {
    super(dialogService);
  }
  ngOnInit() {
    this.getComments();
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('modal-open');
  }

  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal-open');   //remove the class
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

}
