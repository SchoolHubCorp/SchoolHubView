import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginPostData, RegisterPostData } from 'src/Interfaces/login-module';
import { EntrancePagesService } from '../entrance-pages.service';
import { SignInUpService } from './sign-in-up.service';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss']
})
export class SignInUpComponent implements OnInit {
  tabId!: number;
  loginForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});
  registerUserPostData!: RegisterPostData;
  registerParentPostData!: RegisterPostData;
  loginPostData!: LoginPostData;
  userRole: string = '';
  errorMessage!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private entrancePagesService: EntrancePagesService,
    private signInUpService: SignInUpService,
    ){}

  ngOnInit(): void {
    this.tabChanged();
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.min(9)]],
      password: ['', [Validators.required, Validators.pattern('^[^\s]{6,}$')]],
      confirmPassword: ['', [Validators.required]],
      accessCode: ['', [Validators.required]],
      pesel: ['', [Validators.required]],
    },
    {
      validators: this.matchValidator('password', 'confirmPassword')
    }
    );
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
    this.getUserRole();
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }
  
  reloadPage(): void {
    window.location.reload();
  }

  tabChanged(tabChangeEvent?: MatTabChangeEvent): void {
    if(tabChangeEvent) {
      this.tabId = tabChangeEvent.index;
    };
  }

  getUserRole(): void {
    this.entrancePagesService.role$.subscribe(value => {
      this.userRole = value as string;
    })
  }

  onLoginSubmit(post: any): void {
    this.loginPostData = {
      username: post.email,
      password: post.password,
    }

    this.signInUpService.loginUser(this.loginPostData).subscribe(
      response => {
        this.router.navigate(['/pulpit']);
      },
      (error: HttpErrorResponse ) => {
        console.log(error);
        this.errorMessage = error.error;
      }
    ); 
  }

  onRegisterSubmit(post: any): void {
    this.registerUserPostData = {
      username: post.email,
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      phoneNumber: `${post.phone}`,
      password: post.password,
      pesel: post.pesel,
      classCode: post.accessCode
    }

    this.registerParentPostData = {
      username: post.email,
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      phoneNumber: `${post.phone}`,
      password: post.password,
      pesel: post.pesel,
      ChildCode: post.accessCode
    }

    if (this.userRole === 'role-2') {
      this.signInUpService.registerParent(this.registerParentPostData)
        .subscribe(
          response => {
            this.reloadPage();
          },
          (error: HttpErrorResponse ) => {
            console.log(error);
            this.errorMessage = error.error;
          });
    }
    if (this.userRole === 'role-0') {
      this.signInUpService.registerUser(this.registerUserPostData)
      .subscribe(
        response => {
          this.reloadPage();
        },
        (error: HttpErrorResponse ) => {
          console.log(error);
          this.errorMessage = error.error;
        });
    }
    else {
      this.errorMessage = 'Please, choose role!';
    }
  }

  public checkLoginError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public checkRegisterError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
