import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';

import { SharedModule }         from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { AuthLinksComponent } from './authentication/auth-links.component';
import { AlbumModule } from "./album/album.module";
import { Ng2Cable, Broadcaster } from 'ng2-cable/js';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {Ng2CompleterModule} from "ng2-completer";
import {SearchService} from "./search/search.service";
import {UserModule} from "./user/user.module";


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomepageComponent,
    AuthLinksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    AuthenticationModule,
    AlbumModule,
    ToasterModule,
    Ng2CompleterModule,
    UserModule
  ],
  providers: [
    Angular2TokenService,
    CookieService,
    Ng2Cable,
    Broadcaster,
    ToasterService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
