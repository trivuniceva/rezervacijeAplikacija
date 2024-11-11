import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../core/service/user/user.service';
import {AuthService} from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  user: any = {};
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  changePassword() {
    console.log("Changing password...");
    let email = this.authService.getLoggedUser().email;

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    this.isSubmitting = true;

    this.userService.changePassword(email, this.oldPassword, this.newPassword)
      .subscribe(
        (response) => {
          this.isSubmitting = false;
          if (response === "Password changed successfully.") {
            console.log("Password change successful!");
            this.errorMessage = '';  // Clear any previous error message
          } else {
            this.errorMessage = 'Failed to change password.';
          }
        },
        (error) => {
          this.isSubmitting = false;
          // Displaying the error message returned from the backend
          this.errorMessage = error.error || 'Failed to change the password due to a server error.';
        }
      );
  }


}
