import { NgModule }       from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import {AlbumListComponent} from "./album-list.component";
import {AlbumShowComponent} from "./album-show.component";
import {AlbumNewComponent} from "./album-new.component";
import {LoggedInGuard} from "../authentication/logged-in-guard.service";
import {PhotoNewComponent} from "./photo/photo-new.component";
import {PhotoShowComponent} from "./photo/photo-show.component";

const routes: Routes = [
  { path: '',        component: AlbumListComponent },
  { path: 'new',     component: AlbumNewComponent },
  { path: ':id',    component: AlbumShowComponent },
  { path: ':album_id/photos/new',    component: PhotoNewComponent },
  { path: ':album_id/photos/:id',    component: PhotoShowComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'albums',
        canActivate: [LoggedInGuard],
        children: routes
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AlbumRoutingModule {}
