import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {UserService} from '../../core/service/user/user.service';
import {AuthService} from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {

  reasons = [
    'Privacy concerns',
    'Too busy/too distracting',
    'Concerned about my data',
    'Trouble getting started',
    'Want to remove something',
    'Created a second account',
    'Too many ads',
    'Something else'
  ];

  selectedReason: string | null = null;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
  }

  toggleRadio(reason: string) {
    if (this.selectedReason === reason) {
      this.selectedReason = null;
    } else {
      this.selectedReason = reason;
    }
  }

  onSubmit() {
  }

  onDeleteAccount() {
    let email = this.authService.getLoggedUser().email;

  }

  onCancel() {
    this.router.navigate(["/profile"])
  }

}
