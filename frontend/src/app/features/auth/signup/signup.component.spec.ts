import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {AuthService} from '../../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
      imports: [ReactiveFormsModule, SignupComponent, HttpClientTestingModule,], // Važno je dodati ReactiveFormsModule
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: FormBuilder, useValue: formBuilder } // Dodajte FormBuilder ovde ako ga niste automatski dobili
      ]
    }).compileComponents(); // Dodajte compileComponents() ovde

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
