import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {HomepageComponent} from './features/homepage/homepage.component';
import {SignupComponent} from './features/auth/signup/signup.component';
import {UserProfileComponent} from './features/user-profile/user-profile.component';
import {DeleteAccountComponent} from './features/delete-account/delete-account.component';
import {ChangePasswordComponent} from './features/change-password/change-password.component';
import {GuestReservationComponent} from './features/reservation/guest-reservation/guest-reservation.component';
import {AddApartmentComponent} from './features/apartment/add-apartment/add-apartment.component';
import {EditApartmentComponent} from './features/apartment/edit-apartment/edit-apartment.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'delete-account', component: DeleteAccountComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'guest-reservation', component: GuestReservationComponent},
  {path: 'add-apartment', component: AddApartmentComponent},
  {path: 'edit-apartment', component: EditApartmentComponent},

];
