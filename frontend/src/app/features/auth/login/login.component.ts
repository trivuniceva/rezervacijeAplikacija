import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/service/auth/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  forgotPassword() {

  }

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  login() {
    console.log("ajmo log")
    this.authService.login(this.email, this.password).subscribe(response => {
      console.log('Login successful', response);
      console.log("pile moje")
      localStorage.setItem('loggedUser', JSON.stringify(response)); // Čuvaj korisnika
      this.router.navigate(['/profile'])
    }, error => {
      console.error('Login failed', error);
    });
  }

}
