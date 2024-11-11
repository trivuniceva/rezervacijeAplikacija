import {Component, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const user = this.authService.getLoggedUser();
    if (user) {
      this.router.navigate(['/profile']);
    }
  }


  forgotPassword() {

  }

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  login() {
    console.log("Attempting login...");
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response) {
        console.log('Login successful', response);
        this.authService.storageHandle({ user: response });
        this.router.navigate(['/profile']);
      } else {
        console.error('Login failed');
        this.errorMessage = 'Invalid login credentials';
      }
    }, error => {
      console.error('Login error', error);
      this.errorMessage = 'An error occurred during login';
    });
  }

}
