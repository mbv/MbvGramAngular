import {Component} from '@angular/core';
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
  protected text: string;
  protected dataService: CompleterData;

  constructor(private _tokenService: Angular2TokenService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster,
              private toasterService: ToasterService,
              private searchService: SearchService,
              private router: Router) {
    this._tokenService.init({
      apiBase: GlobalVariable.BASE_API_URL,
      signOutFailedValidate: true,
    });

    this.dataService = new SearchCompleterData(searchService);// completerService.remote(`${GlobalVariable.BASE_API_URL}/search/`, null, 'search_result').descriptionField('search_description');


    let authData = this._tokenService.currentAuthData;

    let authDataUrlQuery = `?access-token=${authData.accessToken}&client=${authData.client}&uid=${authData.uid}`;

    this.ng2cable.subscribe(`${GlobalVariable.BASE_API_URL}/cable${authDataUrlQuery}`, 'CommentsChannel');

    this.broadcaster.on<string>('CommentsChannel').subscribe(
      (message) => {
        let comment = <Comment>((<any>message).comment);
        let user = ((<any>message).user);

        let toast: Toast = {
          type: 'info',
          title: 'New Comment on Photo #' + comment.photo_id,
          body: '<strong>' + user.first_name + ' ' + user.last_name + '</strong>:' + comment.text,
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
    );
  }

  public goTo(o: any): void {
    switch (o.object_type) {
      case 'User': {
        let link = ['/users', o.id];
        this.router.navigate(link);
        break;
      }

      case 'Album': {
        let link = ['/albums', o.id];
        this.router.navigate(link);
        break;
      }
      case 'Photo': {
        let link = ['/albums', o.album_id, 'photos', o.id];
        this.router.navigate(link);
        break;
      }
    }
  }

  public onSearchSelected(selected: CompleterItem) {
    if (selected) {
      this.goTo(selected.originalObject);
    }
  }
}
