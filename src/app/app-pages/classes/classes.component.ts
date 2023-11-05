import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ClassResponse } from 'src/Interfaces/plan-models';
import { ClassRequestService } from 'src/services/server-requests/class-request.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy {
  classesList$!: Observable<ClassResponse[]>;
  private subscription: Subscription = new Subscription;
  addingClassFormController = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(5)
  ]);

  constructor(
    private classRequestService: ClassRequestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshSubjectsList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshSubjectsList(): void {
    this.classesList$ = this.classRequestService.getAllClasses();
  }

  addClass(): void {
    if (this.addingClassFormController.valid && this.addingClassFormController.value) {
      this.subscription.add(
        this.classRequestService.postClass(this.addingClassFormController.value)
        .subscribe(response => {
            this.refreshSubjectsList();
            this.addingClassFormController.reset();
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      );
    }
  }
  
  onEdit(editingClass: ClassResponse): void {
    this.router.navigate(['/schoolhub/class', editingClass.className], {
        state: { chosenClass: editingClass }
    });
  } 

  deleteClass(classroomId: number): void {
    this.subscription.add(
      this.classRequestService.deleteClass(classroomId)
      .subscribe(response => {
          this.refreshSubjectsList();
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }
}
