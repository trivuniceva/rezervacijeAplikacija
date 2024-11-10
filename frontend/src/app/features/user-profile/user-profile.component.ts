import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../core/service/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user: any;
  isEditing = false;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser()
    console.log(this.user)
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.isEditing = false;
      },
      error => {
        console.error('Error updating user:', error);
      }
    );

  }

  cancelEditing() {
    this.isEditing = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('profilePic', file);
      formData.append('email', this.user.email); // Dodaj email korisnika u formu

      // Poziv metode `uploadProfilePic` umesto `updateProfilePic`
      this.userService.uploadProfilePic(formData).subscribe(
        (response: any) => {
          console.log('Profile picture uploaded:', response);
          this.user.profilePic = response.profilePicUrl; // Ovde očekuješ putanju do slike
        },
        (error: HttpErrorResponse) => {
          console.error('Error uploading profile picture:', error);
        }
      );

    }
  }




  deleteAcc() {
    this.router.navigate(["/delete-account"])
  }

}
