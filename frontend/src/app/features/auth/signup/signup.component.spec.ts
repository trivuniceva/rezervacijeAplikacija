import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SignupComponent} from './signup.component';
import {AuthService} from '../../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    formBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignupComponent, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: FormBuilder, useValue: formBuilder}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('treba da se kreira', () => {
    expect(component).toBeTruthy();
  });

  it('treba da ispravno inicijalizuje signupForm', () => {
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

  it('treba da predje na sledeci korak', () => {
    component.goToStep(2);
    expect(component.currentStep).toBe(2);
  });

  it('treba da se vrati na prethodni korak', () => {
    component.currentStep = 2;
    component.goToStep(1);
    expect(component.currentStep).toBe(1);
  });

  describe('validacija forme', () => {
    it('treba da bude validna kada su svi unosi validni', () => {
      component.signupForm.setValue({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: 'GUEST'
      });
      fixture.detectChanges();
      expect(component.signupForm.valid).toBeTruthy();
    });

    it('treba da bude nevalidna ako je email nevalidan', () => {
      component.signupForm.controls['email'].setValue('nevalidan-email');
      expect(component.signupForm.controls['email'].errors?.['email']).toBeTruthy();
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('treba da bude nevalidna ako su obavezna polja prazna', () => {
      component.signupForm.setValue({
        email: '',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: 'GUEST'
      });
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('treba da bude nevalidna ako je lozinka prekratka', () => {
      component.signupForm.controls['password'].setValue('');
      expect(component.signupForm.controls['password'].errors?.['required']).toBeTruthy();
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('ne bi trebalo da posalje formu ako se lozinke ne poklapaju', () => {
      component.signupForm.setValue({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'wrong-password',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: 'GUEST'
      });
      spyOn(console, 'error');
      component.onSubmit();
      expect(authServiceSpy.register).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Form is invalid or passwords do not match');
    });
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
        role: 'GUEST'
      });
    });

    it('treba da pozove authService.register i navigira na /login kada je registracija uspešna', () => {
      authServiceSpy.register.and.returnValue(of({message: 'Registration successful'}));
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

    it('treba da prikaze poruku o gresci ako registracija ne uspe', () => {
      authServiceSpy.register.and.returnValue(throwError(() => new Error('Registration failed')));
      spyOn(console, 'error');
      component.onSubmit();
      expect(console.error).toHaveBeenCalledWith('Registration error:', new Error('Registration failed'));
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('ne bi trebalo da pozove authService.register ako je forma nevalidna', () => {
      component.signupForm.controls['email'].setValue('nevalidan-email');
      spyOn(console, 'error');
      component.onSubmit();
      expect(console.error).toHaveBeenCalledWith('Form is invalid or passwords do not match');
      expect(authServiceSpy.register).not.toHaveBeenCalled();
    });
  });

});
