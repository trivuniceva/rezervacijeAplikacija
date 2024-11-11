import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
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

  constructor(private authService: AuthService) {
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    this.isSubmitting = true;

    // this.authService.changePassword(this.oldPassword, this.newPassword)
    //   .subscribe(
    //     () => {
    //       this.isSubmitting = false;
    //     },
    //     (error) => {
    //       this.isSubmitting = false;
    //       this.errorMessage = 'Failed to change the password.';
    //     }
    //   );
  }

}
