import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterTeacher } from 'src/Interfaces/login-models';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { SignInUpService } from 'src/app/common/entrance-pages/sign-in-up/sign-in-up.service';
import { TeachersRequestService } from 'src/services/server-requests/teachers-request.service';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private teachersRequestService: TeachersRequestService,
    private showResponseMessageService: ShowResponseMessageService,
    public dialogRef: MatDialogRef<AddTeacherComponent>
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.min(9)]],
      password: ['', [Validators.required, Validators.pattern('^[^\s]{6,}$')]],
      pesel: ['', [Validators.required]],
    });
  }

  onRegisterSubmit(post: any): void {
    const registerTeacherPostData: RegisterTeacher = {
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      phoneNumber: `${post.phone}`,
      password: post.password,
      pesel: post.pesel,
    }

    this.teachersRequestService.registerTeacher(registerTeacherPostData)
    .subscribe(response => {
      this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Teacher has been registerd successfully');
      this.dialogRef.close();
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
      console.log(error);
    })
  }

  public checkRegisterError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
