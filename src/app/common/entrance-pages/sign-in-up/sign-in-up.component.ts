import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EntranceResponse, LoginPostData, RegisterPostData } from 'src/Interfaces/login-models';
import { SignInUpService } from './sign-in-up.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss']
})
export class SignInUpComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  tabId!: number;
  loginForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});
  registerUserPostData!: RegisterPostData;
  registerParentPostData!: RegisterPostData;
  loginPostData!: LoginPostData;
  errorMessage!: string;
  selectedValue!: string;
  roles: string[] = ['PARENT', 'PUPIL'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectedValueChange(value: any) {
    this.selectedValue = value;
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

  onLoginSubmit(post: any): void {
    this.loginPostData = {
      email: post.email,
      password: post.password,
    }

    this.subscription.add(
      this.signInUpService.loginUser(this.loginPostData).subscribe(
        (response: EntranceResponse) => {
          console.log(response);
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('user_role', response.role);
          this.router.navigate(['/schoolhub']);
        },
        (error: HttpErrorResponse ) => {
          console.log(error);
          this.errorMessage = error.error;
        }
      )
    );
  }

  onRegisterSubmit(post: any): void {
    console.log(this.selectedValue);
    this.registerUserPostData = {
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      phoneNumber: `${post.phone}`,
      password: post.password,
      pesel: post.pesel,
      classCode: post.accessCode
    }

    this.registerParentPostData = {
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      phoneNumber: `${post.phone}`,
      password: post.password,
      pesel: post.pesel,
      ChildCode: post.accessCode
    }

    if (this.selectedValue === 'PARENT') {
      this.subscription.add(
        this.signInUpService.registerParent(this.registerParentPostData)
          .subscribe(
            response => {
              this.reloadPage();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
              this.errorMessage = error.error;
            }
          )
      );
    }
    if (this.selectedValue === 'PUPIL') {
      this.subscription.add(
        this.signInUpService.registerUser(this.registerUserPostData)
        .subscribe(
          response => {
            this.reloadPage();
          },
          (error: HttpErrorResponse ) => {
            console.log(error);
            this.errorMessage = error.error;
          })
      );
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
