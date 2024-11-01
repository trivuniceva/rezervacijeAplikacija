import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {HomepageComponent} from './features/homepage/homepage.component';
import {SignupComponent} from './features/auth/signup/signup.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
];
