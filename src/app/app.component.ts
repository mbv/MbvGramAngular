import {Component, ViewContainerRef} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {GlobalVariable} from "./globals";
import {Broadcaster, Ng2Cable} from "ng2-cable/js";
import {ToasterService, Toast, BodyOutputType} from 'angular2-toaster';
import {Comment} from './album/photo/comments/comment'
import {CompleterData, CompleterItem, CompleterService} from "ng2-completer";
import {SearchCompleterData} from "./search/search-data";
import {SearchService} from "./search/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public dataService: SearchCompleterData;

  constructor(private _tokenService: Angular2TokenService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster,
              private toasterService: ToasterService,
              private searchService: SearchService,
              private router: Router,) {
    this._tokenService.init({
      apiBase: GlobalVariable.BASE_API_URL,
      signOutFailedValidate: true,
    });

    this.dataService = new SearchCompleterData(searchService, router);


    if (this._tokenService.userSignedIn()) {

      let authData = this._tokenService.currentAuthData;

      let authDataUrlQuery = `?access-token=${authData.accessToken}&client=${authData.client}&uid=${authData.uid}`;

      this.ng2cable.subscribe(`${GlobalVariable.BASE_API_URL}/cable${authDataUrlQuery}`, 'CommentsChannel');

      this.broadcaster.on<string>('CommentsChannel').subscribe(
        (message) => {
          let comment = <Comment>((<any>message).comment);
          let user = ((<any>message).user);
          comment.photo = ((<any>message).photo);

          let toast: Toast = {
            type: 'info',
            title: 'New Comment on Photo #' + comment.photo_id,
            body: '<strong>' + user.first_name + ' ' + user.last_name + '</strong>:' + comment.text,
            bodyOutputType: BodyOutputType.TrustedHtml,
            clickHandler: this.returnHandlerCommentPushClick(comment)
          };
          this.toasterService.pop(toast);
        }
      );
    }
  }

  public returnHandlerCommentPushClick(comment: Comment): (toast: Toast, isCloseButton?: boolean) => boolean {
    let router = this.router;
    return function(toast: Toast, isCloseButton?: boolean):boolean {
      if (!isCloseButton) {
        let link = ['/albums', comment.photo.album_id, 'photos', comment.photo.id];
        router.navigate(link);
      }
      return true;
    }
  }

  public onSearchSelected(selected: CompleterItem) {
      this.dataService.goTo(selected);
  }
}
