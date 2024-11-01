import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  forgotPassword() {

  }

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  login() {

  }
}
