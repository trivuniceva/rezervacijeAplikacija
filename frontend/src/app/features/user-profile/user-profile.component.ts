import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user: any;
  isEditing = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser()
  }

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
