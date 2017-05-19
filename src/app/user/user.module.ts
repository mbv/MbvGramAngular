import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule}                from '../shared/shared.module';

import {UserShowComponent} from "./user-show.component";
import {UserService} from "./user.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    UserShowComponent,
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
