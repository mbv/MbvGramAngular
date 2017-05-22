import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {AccountComponent} from './account/account.component';
import {UserShowComponent} from "./user/user-show.component";
import {FeedComponent} from "./feed/feed.component";
import {LoggedInGuard} from "./authentication/logged-in-guard.service";


const routes: Routes = [
  {path: '', redirectTo: '/feed', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
];
const routesLoggedIn: Routes = [
  {path: 'feed', component: FeedComponent},
  {path: 'profile', component: AccountComponent},
  {path: 'users/:id', component: UserShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forChild([
      {
        path: '',
        canActivate: [LoggedInGuard],
        children: routesLoggedIn
      }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
