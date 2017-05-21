import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {AccountComponent} from './account/account.component';
import {UserShowComponent} from "./user/user-show.component";
import {FeedComponent} from "./feed/feed.component";


const routes: Routes = [
  {path: '', redirectTo: '/feed', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'profile', component: AccountComponent},
  {path: 'users/:id', component: UserShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
