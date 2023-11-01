import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClassResponse } from 'src/Interfaces/plan-module';
import { PlanRequestService } from 'src/services/server-requests/plan-request.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classs: string = '13po';
  subjectsList$!: Observable<ClassResponse[]>;
  addingClassFormController = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(5)
  ]);

  constructor(
    private planRequestService: PlanRequestService
  ) {}

  ngOnInit(): void {
    this.refreshSubjectsList();
  }

  refreshSubjectsList(): void {
    this.subjectsList$ = this.planRequestService.getAllClasses();
  }

  addClass(): void {
    if (this.addingClassFormController.valid && this.addingClassFormController.value) {
      this.planRequestService.postClass(this.addingClassFormController.value)
        .subscribe(response => {
            this.refreshSubjectsList();
            this.addingClassFormController.reset();
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
    }
  }
}
