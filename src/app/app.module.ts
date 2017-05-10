import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';

import { SharedModule }         from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { AuthLinksComponent } from './authentication/auth-links.component';
import { AlbumModule } from "./album/album.module";

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
    AlbumModule
  ],
  providers: [
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
