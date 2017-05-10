import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AlbumRoutingModule} from "./album-routing.module";
import {SharedModule}                from '../shared/shared.module';

import {AlbumListComponent}  from './album-list.component';
import {AlbumNewComponent}  from './album-new.component';
import {AlbumShowComponent}  from './album-show.component';
import {AlbumService} from "./album.service";
import {TagService} from "../tag/tag.service";
import {Select2Module} from "ng2-select2";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    SharedModule,
    Select2Module
  ],
  declarations: [
    AlbumListComponent,
    AlbumNewComponent,
    AlbumShowComponent
  ],
  providers: [
    AlbumService,
    TagService
  ]
})
export class AlbumModule {
}
