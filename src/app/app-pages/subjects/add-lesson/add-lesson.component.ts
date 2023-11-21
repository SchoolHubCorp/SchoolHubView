import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { AddLessonRequest } from 'src/Interfaces/subjects-models';
import { SubjectsRequestService } from 'src/services/server-requests/subjects-request.service';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';

@Component({
  selector: 'app-add-lesson',
  styleUrls: ['./add-lesson.component.scss'],
  template: `
    <div class="add-lesson-container">
      <h2 mat-dialog-title>Add lesson</h2>
      <div mat-dialog-content>
        <mat-form-field>
          <input matInput placeholder="Lesson title" [(ngModel)]="lessonTitle" required>
        </mat-form-field>
        <br>
        <mat-form-field>
          <textarea matInput placeholder="Lesson description" [(ngModel)]="lessonDescription" rows="5"></textarea>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-raised-button color="primary" (click)="addLesson()">Add lesson</button>
      </div>
    </div>
  `,
})
export class AddLessonComponent implements OnDestroy {
  lessonTitle!: string;
  lessonDescription!: string;
  private subscription: Subscription = new Subscription;
  selectedCourseId!: number;

  constructor(
    private subjectsRequestService: SubjectsRequestService,
    private showResponseMessageService: ShowResponseMessageService,
    public dialogRef: MatDialogRef<AddLessonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedCourseId = Number(data.courseId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addLesson(): void {
    if (this.lessonTitle && this.lessonDescription) {
      const newLesson: AddLessonRequest = {
        topicName: this.lessonTitle,
        description: this.lessonDescription,
        courseId: this.selectedCourseId
      };

      this.subscription.add(
        this.subjectsRequestService.addLesson(newLesson)
        .subscribe(response => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Lesson has been added successfully');
          this.dialogRef.close();
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          console.log(error);
        })
      )
    }
  }
}
