import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  renewForm: FormGroup = new FormGroup({});
  
  constructor(
    private router: Router,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {
    this.renewForm = this.fb.group({
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [''],
    });
    
  }

  onSubmit(post: any) {
    console.log('Post', post);
  }

  public checkRenewError = (controlName: string, errorName: string) => {
    return this.renewForm.controls[controlName].hasError(errorName);
  }
}
