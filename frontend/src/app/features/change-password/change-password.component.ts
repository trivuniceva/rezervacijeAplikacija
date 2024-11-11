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
    console.log("Attempting to change password...");
    let email = this.authService.getLoggedUser().email;

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    this.isSubmitting = true;

    this.userService.changePassword(email, this.oldPassword, this.newPassword)
      .subscribe(
        (response: { message: string }) => {
          console.log("Server response:", response); // Log the whole response

          this.isSubmitting = false;

          // Proveri sadržaj poruke iz odgovora
          if (response && response.message) {
            if (response.message === "Password changed successfully.") {
              console.log("Password change successful!");
              this.errorMessage = '';  // Clear error message on success
            } else {
              this.errorMessage = response.message || 'Failed to change password.'; // Display failure message
            }
          } else {
            this.errorMessage = 'Unexpected response format.';
          }
        },
        (error) => {
          this.isSubmitting = false;
          console.error("Error response:", error); // Log error response

          // Ako je greška objekat, izvlaci grešku iz objekta
          this.errorMessage = error.error ? error.error.message || error.message : 'Failed to change the password due to a server error.';
        }
      );
  }

}
