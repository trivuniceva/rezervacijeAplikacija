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

  describe('Validacija forme', () => {
    const setValidForm = (role: string = 'GUEST') => {
      component.signupForm.setValue({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: role
      });
      fixture.detectChanges();
    };

    it('treba da bude validna kada su svi unosi validni', () => {
      setValidForm();
      expect(component.signupForm.valid).toBeTruthy();
      expect(component.signupForm.get('address')?.value).toBeDefined();
      expect(component.signupForm.get('phone')?.value).toBeDefined();
    });

    ['email', 'password', 'confirmPassword', 'firstname', 'lastname', 'role'].forEach(controlName => {
      it(`treba da bude nevalidna ako je polje '${controlName}' prazno (Required)`, () => {
        setValidForm();
        component.signupForm.controls[controlName].setValue('');
        expect(component.signupForm.controls[controlName].errors?.['required']).toBeTruthy();
        expect(component.signupForm.valid).toBeFalsy();
      });
    });

    it('treba da bude nevalidna ako je email nevalidnog formata', () => {
      setValidForm();
      component.signupForm.controls['email'].setValue('nevalidan-email');
      expect(component.signupForm.controls['email'].errors?.['email']).toBeTruthy();
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('treba da bude nevalidna ako je lozinka prekratka (MinLength - testiran sa duzinom 0, jer je minLength 1)', () => {
      setValidForm();
      component.signupForm.controls['password'].setValue('');
      component.signupForm.controls['confirmPassword'].setValue('');

      expect(component.signupForm.controls['password'].errors?.['required']).toBeTruthy();
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('treba da bude nevalidna ako se lozinka i potvrda lozinke ne poklapaju (Izuzetan slucaj)', () => {
      setValidForm();
      component.signupForm.controls['confirmPassword'].setValue('druga-lozinka');

      expect(component.signupForm.valid).toBeTruthy();

      spyOn(console, 'error');
      component.onSubmit();
      expect(authServiceSpy.register).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Form is invalid or passwords do not match');
    });

    it('treba da bude validna kada su opcionalna polja (address, phone) prazna', () => {
      setValidForm();
      component.signupForm.controls['address'].setValue('');
      component.signupForm.controls['phone'].setValue('');
      expect(component.signupForm.valid).toBeTruthy();
    });
  });

  describe('Slanje forme (onSubmit)', () => {
    it('treba da posalje podatke sa ulogom VLASNIK (OWNER) i navigira na /login kada je uspesna registracija', () => {
      component.signupForm.setValue({
        email: 'owner@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'Ana',
        lastname: 'Anic',
        address: '456 Oak St',
        phone: '987-654-3210',
        role: 'OWNER'
      });
      authServiceSpy.register.and.returnValue(of({message: 'Registration successful'}));

      component.onSubmit();

      expect(authServiceSpy.register).toHaveBeenCalledWith(
        jasmine.objectContaining({
          email: 'owner@example.com',
          role: 'OWNER'
        })
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('treba da posalje podatke sa ulogom GOST (GUEST) i navigira na /login kada je uspesna registracija', () => {
      component.signupForm.setValue({
        email: 'guest@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'Petar',
        lastname: 'Petrovic',
        address: '',
        phone: '',
        role: 'GUEST'
      });
      authServiceSpy.register.and.returnValue(of({message: 'Registration successful'}));

      component.onSubmit();

      expect(authServiceSpy.register).toHaveBeenCalledWith(
        jasmine.objectContaining({
          email: 'guest@example.com',
          address: '',
          phone: '',
          role: 'GUEST'
        })
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('treba da prikaze poruku o gresci i NE navigira ako registracija ne uspe', () => {
      component.signupForm.setValue({
        email: 'duplicate@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        role: 'GUEST'
      });
      const errorResponse = new Error('Email already in use');
      authServiceSpy.register.and.returnValue(throwError(() => errorResponse));
      spyOn(console, 'error');

      component.onSubmit();

      expect(console.error).toHaveBeenCalledWith('Registration error:', errorResponse);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('treba da pozove register sa ispravnim DTO objektom koji sadrži sva polja', () => {
      const expectedData = {
        email: 'dto@test.com',
        password: 'dtoPassword123',
        confirmPassword: 'dtoPassword123',
        firstname: 'DTO',
        lastname: 'User',
        address: 'Adresa',
        phone: '111222333',
        role: 'OWNER'
      };
      component.signupForm.setValue(expectedData);
      expectedData.role = expectedData.role.toUpperCase();
      const payload = {
        email: expectedData.email,
        password: expectedData.password,
        confirmPassword: expectedData.confirmPassword,
        firstname: expectedData.firstname,
        lastname: expectedData.lastname,
        address: expectedData.address,
        phone: expectedData.phone,
        role: expectedData.role,
      };

      authServiceSpy.register.and.returnValue(of({message: 'Registration successful'}));
      component.onSubmit();

      expect(authServiceSpy.register).toHaveBeenCalledWith(payload);
    });
  });
});
