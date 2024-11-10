import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  currentStep: number = 1;

  constructor(private router: Router, private fb: FormBuilder, private userService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: [''],
      phone: [''],
      role: ['', Validators.required]
    });
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      const userData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        firstname: this.signupForm.value.firstname,
        lastname: this.signupForm.value.lastname,
        address: this.signupForm.value.address,
        phone: this.signupForm.value.phone,
        role: this.signupForm.value.role.toUpperCase()
      };

      console.log(userData.role)

      this.userService.register(userData).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error:', error);
        }
      );
    } else {
      console.error('Form is invalid or passwords do not match');
    }
  }
}
