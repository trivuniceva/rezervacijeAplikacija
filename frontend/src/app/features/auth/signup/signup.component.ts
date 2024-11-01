import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  passwordConfirmed: string = '';
  signupForm!: FormGroup;
  currentStep: number = 1;

  goToStep(step: number): void {
    this.currentStep = step;
  }
}
