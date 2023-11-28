import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { UserSubjectLessons, UserSubjectsResponse } from 'src/Interfaces/subjects-models';
import { TokenCheckerService } from 'src/services/token-checker';
import { TeachersRequestService } from 'src/services/server-requests/teachers-request.service';
import { PupilsRequestService } from 'src/services/server-requests/pupils-request.service';
import { TeachersSubjects } from 'src/Interfaces/teachers-models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { SubjectsService } from './subjects.service';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { SubjectsRequestService } from 'src/services/server-requests/subjects-request.service';
import { ReviewHomeworkComponent } from './review-homework/review-homework.component';
import { HomeworkRequestService } from 'src/services/server-requests/homework-request.service';

export enum UserRole {
  Teacher = 'Teacher',
  Parent = 'Parent',
  Pupil = 'Pupil',
  Admin = 'Admin'
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  subjectsList$!: Observable<UserSubjectsResponse[]>;
  role!: string;
  selectedSubjectId!: number;
  teacherSubjectsList!: TeachersSubjects[];
  lessonsList$!: Observable<UserSubjectLessons[]>;
  selectedFile: File | null = null;

  constructor(
    private tokenCheckerService: TokenCheckerService,
    private teachersRequestService: TeachersRequestService,
    private pupilsRequestService: PupilsRequestService,
    private dialog: MatDialog,
    private subjectsService: SubjectsService,
    private showResponseMessageService: ShowResponseMessageService,
    private subjectsRequestService: SubjectsRequestService,
    private homeworkRequestService: HomeworkRequestService,
  ) {}

  ngOnInit(): void {
    this.getUserRole();
    this.getUserSubjectsList();
    this.initSubjectInfo();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserRole(): void {
    this.role = this.tokenCheckerService.getAuthUserRole() as string;
  }

  initSubjectInfo(): void {
    this.subscription.add(
      this.subjectsList$.subscribe((subjectList) => {
        if (subjectList && subjectList.length > 0) {
          this.selectSubject(subjectList[0].id);
        }
      })
    );
  }

  selectSubject(subjectId: number): void {
    this.selectedSubjectId = subjectId;
    this.getUserLessonsList();
  }

  addLesson(): void {
    const dialogRef = this.dialog.open(AddLessonComponent, {
      data: {
        courseId: this.selectedSubjectId
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getUserSubjectsList();
      this.getUserLessonsList();
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onFileUpload(topicId: number): void {
    if (this.selectedFile) {
      if (this.role === UserRole.Pupil) {
        this.subscription.add(
          this.pupilsRequestService.uploadPupilHomework(this.selectedFile, topicId)
          .subscribe(response => {
            console.log(response);
            this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Homework has been upload successfully');
            this.getUserLessonsList();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          })
        )
      }
      if (this.role === UserRole.Teacher) {
        this.subscription.add(
          this.teachersRequestService.uploadTopicFile(this.selectedFile, topicId)
          .subscribe(response => {
            console.log(response);
            this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Homework has been upload successfully');
            this.getUserLessonsList();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          })
        )
      }
    } else {
      console.error('No file selected.');
    }
  }
  
  getUserSubjectsList(): void {
    if (this.role === UserRole.Pupil || this.role === UserRole.Parent) {
      this.subjectsList$ = this.subjectsService.mapPupilsList(this.pupilsRequestService.getPersonalPupilSubjects());
    }
    if (this.role === UserRole.Teacher) {
      this.subjectsList$ = this.subjectsService.mapTeachersList(this.teachersRequestService.getPersonalTeacherSubjects());
    }
  }

  getUserLessonsList(): void {
    if (this.role === UserRole.Pupil || this.role === UserRole.Parent) {
      this.subscription.add(
        this.pupilsRequestService.getPupilSubjectLessons(this.selectedSubjectId)
        .subscribe(response => {
          this.lessonsList$ = this.subjectsService.mapLessons(response.topics, UserRole.Pupil);
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.lessonsList$ = of([]);
          console.log(error);
        })
      )
    }
    if (this.role === UserRole.Teacher) {
      this.subscription.add(
        this.teachersRequestService.getTeacherSubjectLessons(this.selectedSubjectId)
        .subscribe(response => {
          this.lessonsList$ = this.subjectsService.mapLessons(response.topics, UserRole.Teacher);
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.lessonsList$ = of([]);
          console.log(error);
        })
      )
    }
  }

  deleteTopic(lessonid: number): void {
    this.subscription.add(
      this.subjectsRequestService.deleteLesson(lessonid)
      .subscribe(response => {
          this.getUserLessonsList();
          console.log(response);
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Lesson has been deleted successfully');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
        }
      )
    );
  }

  openHomeworks(lessonId: number | undefined): void {
    const dialogRef = this.dialog.open(ReviewHomeworkComponent, {
      data: {
        lessonId: lessonId
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getUserSubjectsList();
      this.getUserLessonsList();
    });
  }

  downloadFile(file: string, fileType: string, topicName: string): void {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = topicName;
    link.click();
  }

  deleteFile(topicId: number, homeworkId?: number): void {
    if (this.role === UserRole.Pupil && homeworkId) {
      this.subscription.add(
        this.homeworkRequestService.deletePupilHomework(homeworkId)
        .subscribe(response => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Uploaded file deleted successfully');
          this.getUserLessonsList();
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          console.log(error);
        })
      )
    }
    if (this.role === UserRole.Teacher) {
      this.subscription.add(
        this.homeworkRequestService.deleteTeacherHomework(topicId)
        .subscribe(response => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Uploaded file deleted successfully');
          this.getUserLessonsList();
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
