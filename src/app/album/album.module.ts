import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AlbumRoutingModule} from "./album-routing.module";
import {SharedModule}                from '../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';

import {AlbumListComponent}  from './album-list.component';
import {AlbumNewComponent}  from './album-new.component';
import {AlbumShowComponent}  from './album-show.component';
import {AlbumService} from "./album.service";
import {TagService} from "../tag/tag.service";
import {Select2Module} from "ng2-select2";
import {PhotoNewComponent} from "./photo/photo-new.component";
import {PhotoService} from "./photo/photo.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    SharedModule,
    Select2Module,
    FileUploadModule
  ],
  declarations: [
    AlbumListComponent,
    AlbumNewComponent,
    AlbumShowComponent,
    PhotoNewComponent
  ],
  providers: [
    AlbumService,
    TagService,
    PhotoService
  ]
})
export class AlbumModule {
}
