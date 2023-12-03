import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignInUpService } from '../sign-in-up/sign-in-up.service';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { UpdatedPasswordInfo } from 'src/Interfaces/login-models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  renewForm: FormGroup = new FormGroup({});
  updatedPassword: FormGroup = new FormGroup({});
  codeSubmited!: boolean;
  private subscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private signInUpService: SignInUpService,
    private showResponseMessageService: ShowResponseMessageService,
  ){}

  ngOnInit(): void {
    this.renewForm = this.fb.group({
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
    this.updatedPassword = this.fb.group({
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      accessCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[^\s]{6,}$')]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(email: string): void {
    this.subscription.add(
      this.signInUpService.sentVerifyCode(email)
      .subscribe(response => {
        this.codeSubmited = true;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
        console.log(error);
      })
    )
  }

  sendNewPassword(info: UpdatedPasswordInfo): void {
    this.subscription.add(
      this.signInUpService.resetPassword(info)
      .subscribe(response => {
        this.router.navigate(['/schoolhub']);
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
        console.log(error);
      })
    )
  }

  public checkRenewError = (controlName: string, errorName: string) => {
    return this.renewForm.controls[controlName].hasError(errorName);
  }
}
