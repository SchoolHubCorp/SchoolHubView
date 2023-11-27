import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Homeworks } from 'src/Interfaces/homework-models';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { HomeworkRequestService } from 'src/services/server-requests/homework-request.service';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';

@Component({
  selector: 'app-review-homework',
  templateUrl: './review-homework.component.html',
  styleUrls: ['./review-homework.component.scss']
})
export class ReviewHomeworkComponent implements OnInit {
  private subscription: Subscription = new Subscription;
  grade!: number;
  selectedLesson!: number;
  homeworks!: Homeworks[];
  grades: number[] = [];

  constructor(
    private showResponseMessageService: ShowResponseMessageService,
    private homeworkRequestService: HomeworkRequestService,
    public dialogRef: MatDialogRef<ReviewHomeworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedLesson = Number(data.lessonId);
  }

  ngOnInit(): void {
    this.getHomeworks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getHomeworks(): void {
    this.subscription.add(
      this.homeworkRequestService.getHomework(this.selectedLesson)
        .subscribe(response => {
          console.log(response);
          this.homeworks = response;
          this.grades = this.homeworks.map(() => 0);
        },
          (error: HttpErrorResponse) => {
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          })
    );
  }

  downloadFile(file: string, lastname: string): void {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Homework_${lastname}`;
    link.click();
  }

  setMark(homeworkId: number, pupilId: number, mark: string): void {
    this.subscription.add(
      this.homeworkRequestService.postMark(homeworkId, pupilId, parseInt(mark))
        .subscribe(response => {
          console.log(response);
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Mark has been added successfully');
        },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          }
        )
    );
  }
}
