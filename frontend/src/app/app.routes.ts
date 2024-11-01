import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {HomepageComponent} from './features/homepage/homepage.component';
import {SignupComponent} from './features/auth/signup/signup.component';
import {UserProfileComponent} from './features/user-profile/user-profile.component';
import {DeleteAccountComponent} from './features/delete-account/delete-account.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'delete-account', component: DeleteAccountComponent},

];
