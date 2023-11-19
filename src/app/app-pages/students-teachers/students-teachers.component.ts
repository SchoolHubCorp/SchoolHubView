import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, isEmpty, map, of } from 'rxjs';
import { PupilsRequestService } from 'src/services/server-requests/pupils-request.service';
import { UserCardData, UserTransferData } from './students-teachers.interfaces';
import { StudentsTeachersService } from './students-teachers.service';
import { TeachersRequestService } from 'src/services/server-requests/teachers-request.service';
import { PupilPrivateInfo, PupilResponse } from 'src/Interfaces/pupils-models';
import { TeacherPrivateInfo, TeacherResponse } from 'src/Interfaces/teachers-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassRequestService } from 'src/services/server-requests/class-request.service';
import { ClassResponse } from 'src/Interfaces/plan-models';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

@Component({
  selector: 'app-students-teachers',
  templateUrl: './students-teachers.component.html',
  styleUrls: ['./students-teachers.component.scss']
})
export class StudentsTeachersComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription;
  usersList$!: Observable<UserCardData[]>;
  role!: string;
  generatedUser!: UserTransferData;
  pupilInfo!: PupilResponse;
  teacherInfo!: TeacherResponse;
  privateInfoForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  classesList!: ClassResponse[];
  selectedClass!: number;
  classNameList!: string[];
  selectedUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentsTeachersService: StudentsTeachersService,
    private pupilsRequestService: PupilsRequestService,
    private teachersRequestService: TeachersRequestService,
    private classRequestService: ClassRequestService,
    private fb: FormBuilder,
    private showResponseMessageService: ShowResponseMessageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRole();
    this.uploadUsersList();
    this.initUserInfo();
    this.initPrivateInfoForm();
    this.refreshClassesList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initPrivateInfoForm(): void {
    this.privateInfoForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phoneNumber: ['', [Validators.required, Validators.min(9)]],
      pesel: ['', [Validators.required]],
    });
  }

  patchUserPrivateInfo(user: any): void {
    const userData: any = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      pesel: user.pesel
    }
    this.privateInfoForm.patchValue(userData);
  }

  isUserListEmpty(): boolean {
     if (this.generatedUser) {
      return true;
     }
     return false;
  }

  getRole(): void {
    const path = this.route.snapshot.url[0].path;
    if (path === 'students') {
      this.role = 'students';
    } else if (path === 'teachers') {
      this.role = 'teachers';
    }
  }

  uploadUsersList(): void {
    if (this.role === 'students') {
      this.usersList$ = this.studentsTeachersService.mapPupilsList(this.pupilsRequestService.getAllPupils());
    }
    if (this.role === 'teachers') {
      this.usersList$ = this.studentsTeachersService.mapTeachersList(this.teachersRequestService.getAllTeachers());
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onTeacherPlanUpload(): void {
    if (this.selectedFile) {
      this.subscription.add(
        this.teachersRequestService.setTeacherPlan(this.selectedFile, this.generatedUser.id)
        .subscribe(response => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Plan has been upload successfully');
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          console.log(error);
        })
      )
    } else {
      console.error('No file selected.');
    }
  }

  initUserInfo(): void {
    this.subscription.add(
      this.usersList$.subscribe((usersList) => {
        if (usersList && usersList.length > 0) {
          this.selectUser(usersList[0].id);
        }
      })
    );
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
    this.generatedUser = {
      id: userId,
      role: this.role
    }
    this.getUserInfo();
  }

  public checkUpdatePrivateError = (controlName: string, errorName: string) => {
    return this.privateInfoForm.controls[controlName].hasError(errorName);
  }

  getUserInfo(): void {
    if(this.generatedUser.role === 'students') {
      this.subscription.add(
        this.pupilsRequestService.getPupilInfo(this.generatedUser.id)
        .subscribe(response => {
          this.pupilInfo = response;
          this.patchUserPrivateInfo(response);
          console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      )
    }
    if(this.generatedUser.role === 'teachers') {
      this.subscription.add(
        this.teachersRequestService.getTeacherInfo(this.generatedUser.id)
        .subscribe(response => {
          this.teacherInfo = response;
          this.patchUserPrivateInfo(response);
          console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      )
    }
  }

  updatePrivateInfo(updatedInfo: PupilPrivateInfo | TeacherPrivateInfo): void {
    updatedInfo.id = this.generatedUser.id;
    if(this.generatedUser.role === 'students') {
      this.pupilsRequestService.updatePupilInfo(updatedInfo)
      .subscribe(response => {
        this.getUserInfo();
        this.uploadUsersList();
        this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Info updated successfully');
        console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          console.log(error);
        }
      )
    }
    if(this.generatedUser.role === 'teachers') {
      this.teachersRequestService.updateTeacherInfo(updatedInfo)
      .subscribe(response => {
        this.getUserInfo();
        this.uploadUsersList();
        this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Info updated successfully');
        console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          console.log(error);
        }
      )
    }
  }

  //Edit!!!
  deleteUser(): void {
    if(this.generatedUser.role === 'students') {
      this.subscription.add(
        this.pupilsRequestService.deletePupil(this.generatedUser.id)
        .subscribe(response => {
          //window.location.reload();
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, response);
          console.log(response);
          },
          (error: HttpErrorResponse) => {
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
            console.log(error);
          }
        )
      )
    }
    if(this.generatedUser.role === 'teachers') {
      this.subscription.add(
        this.teachersRequestService.deleteTeacher(this.generatedUser.id)
        .subscribe(response => {
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Teacher has been deleted successfully');
          //window.location.reload();
          console.log(response);
          },
          (error: HttpErrorResponse) => {
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
            console.log(error);
          }
        )
      )
    }
  }

  updatePupilClass(): void {
    if (this.selectedClass) {
      this.subscription.add(
        this.pupilsRequestService.updatePupilClass(this.generatedUser.id, this.selectedClass)
        .subscribe(response => {
          this.getUserInfo();
          this.uploadUsersList();
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Class has been updated successfully');
          console.log(response);
          },
          (error: HttpErrorResponse) => {
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
            console.log(error);
          }
        )
      )
    }
  }

  onClassSelected(selectedClass: string) {
     const takenClass = this.classesList.find((list) => selectedClass === list.className);
     if (takenClass) {
      this.selectedClass = takenClass.id;
     }
  }

  refreshClassesList(): void {
    this.subscription.add(
      this.classRequestService.getAllClasses()
      .subscribe(response => {
        this.classesList = response;
        this.classNameList = this.classesList.map(element => element.className);
        console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    )
  }
  
  addTeacher(): void {
    const dialogRef = this.dialog.open(AddTeacherComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUserInfo();
      this.uploadUsersList();
    });
  }
}
