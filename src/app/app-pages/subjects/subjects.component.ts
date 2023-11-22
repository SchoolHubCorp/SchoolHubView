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

export enum UserRole {
  Teacher = 'Teacher',
  Parent = 'Parent',
  Pupil = 'Pupil',
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

  onFileUpload(): void {}
  
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
          this.lessonsList$ = of(response.topics);
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
        this.teachersRequestService.getTeacherSubjectLessons(this.selectedSubjectId)
        .subscribe(response => {
          this.lessonsList$ = of(response.topics);
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
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

  openHomeworks(): void {

  }
}
