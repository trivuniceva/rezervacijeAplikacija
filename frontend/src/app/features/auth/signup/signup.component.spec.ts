import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {AuthService} from '../../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignupComponent, HttpClientTestingModule,],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signupForm correctly', () => {
    expect(component.signupForm.controls['email']).toBeTruthy();
    expect(component.signupForm.controls['password']).toBeTruthy();
    expect(component.signupForm.controls['confirmPassword']).toBeTruthy();
    expect(component.signupForm.controls['firstname']).toBeTruthy();
    expect(component.signupForm.controls['lastname']).toBeTruthy();
    expect(component.signupForm.controls['address']).toBeTruthy();
    expect(component.signupForm.controls['phone']).toBeTruthy();
    expect(component.signupForm.controls['role']).toBeTruthy();
    expect(component.currentStep).toBe(1);
  });

  it('should navigate to the next step', () => {
    component.goToStep(2);
    expect(component.currentStep).toBe(2);
  });

  it('should navigate to the previous step', () => {
    component.currentStep = 2;
    component.goToStep(1);
    expect(component.currentStep).toBe(1);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.signupForm.setValue({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: 'guest'
      });
    });

    it('should call authService.register and navigate to /login on successful registration', () => {
      authServiceSpy.register.and.returnValue(of({ message: 'Registration successful' }));
      component.onSubmit();
      expect(authServiceSpy.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: 'GUEST'
      });
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should log an error message if passwords do not match', () => {
      component.signupForm.controls['confirmPassword'].setValue('wrongpassword');
      spyOn(console, 'error');
      component.onSubmit();
      expect(console.error).toHaveBeenCalledWith('Form is invalid or passwords do not match');
      expect(authServiceSpy.register).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should log an error message if the form is invalid', () => {
      component.signupForm.controls['email'].setValue('');
      spyOn(console, 'error');
      component.onSubmit();
      expect(console.error).toHaveBeenCalledWith('Form is invalid or passwords do not match');
      expect(authServiceSpy.register).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should log an error message if registration fails', () => {
      authServiceSpy.register.and.returnValue(throwError(() => new Error('Registration failed')));
      spyOn(console, 'error');
      component.onSubmit();
      expect(console.error).toHaveBeenCalledWith('Registration error:', new Error('Registration failed'));
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

});
