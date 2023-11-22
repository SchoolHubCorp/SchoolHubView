import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchingFieldComponent } from 'src/app/common/searching-field/searching-field.component';
import { TokenCheckerService } from 'src/services/token-checker';
import { PlanRequestService } from 'src/services/server-requests/plan-request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  providers: [SearchingFieldComponent]
})
export class PlanComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  userRole!: string;
  plan!: any;

  constructor(
    private planRequestService: PlanRequestService,
    private tokenCheckerService: TokenCheckerService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.tokenCheckerService.getAuthUserRole() as string;
    this.getUserPlan();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserPlan(): void {
    if (this.userRole === 'Pupil' || this.userRole === 'Parent') {
      this.subscription.add(
        this.planRequestService.getPupilPlan().subscribe((response: ArrayBuffer) => {
          const binaryData = [];
          const bytes = new Uint8Array(response);
          for (let i = 0; i < bytes.byteLength; i++) {
            binaryData.push(String.fromCharCode(bytes[i]));
          }
          const base64Image = window.btoa(binaryData.join(''));
          this.plan = 'data:image/png;base64,' + base64Image;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        })
      );
    }
    if (this.userRole === 'Teacher') {
      this.subscription.add(
        this.planRequestService.getTeacherPlan().subscribe((response: ArrayBuffer) => {
          const binaryData = [];
          const bytes = new Uint8Array(response);
          for (let i = 0; i < bytes.byteLength; i++) {
            binaryData.push(String.fromCharCode(bytes[i]));
          }
          const base64Image = window.btoa(binaryData.join(''));
          this.plan = 'data:image/png;base64,' + base64Image;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        })
      );
    }
  }  
}
