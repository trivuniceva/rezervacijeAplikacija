import { Component } from '@angular/core';
import {AuthService} from '../../core/service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: any;
  isEditing = false;

  constructor(private authService: AuthService, private router: Router) {}

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {

  }

  cancelEditing() {
    this.isEditing = false;
  }

  onFileSelected($event: Event) {

  }

  deleteAcc() {
    this.router.navigate(["/delete-account"])

  }

}
