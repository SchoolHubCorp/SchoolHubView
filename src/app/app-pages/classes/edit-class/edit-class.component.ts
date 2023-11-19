import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { ClassDataResponse, PupilInClass } from 'src/Interfaces/pupils-models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassRequestService } from 'src/services/server-requests/class-request.service';
import { PlanRequestService } from 'src/services/server-requests/plan-request.service';
import { ShowResponseMessageService } from 'src/services/show-response-message.service';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { TeachersRequestService } from 'src/services/server-requests/teachers-request.service';
import { AllTeachersShortResponse } from 'src/Interfaces/teachers-models';
import { AddSubject, AddSubjectRequest } from 'src/Interfaces/subjects-models';
import { SubjectsRequestService } from 'src/services/server-requests/subjects-request.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent implements OnInit, OnDestroy {
  pupilsList!: PupilInClass[];
  chosenClassId!: number;
  selectedFile: File | null = null;
  addSubjectForm: FormGroup = new FormGroup({});
  teacherList!: AllTeachersShortResponse[];
  selectedTeacherId!: number;
  searchTeachersList!: string[];
  displayedColumns: string[] = ['position', 'name', 'code', 'edit', 'delete'];
  subjectsList = [
    { position: 1, code: '23531', name: 'Math 3y A' },
    { position: 2, code: '47281', name: 'Science 2y B' },
    { position: 3, code: '18392', name: 'History 4y C' },
    { position: 4, code: '62948', name: 'English 3y A' },
    { position: 5, code: '37462', name: 'Physics 2y B' },
    { position: 6, code: '83729', name: 'Chemistry 4y C' },
    { position: 7, code: '19283', name: 'Biology 3y A' },
    { position: 8, code: '56372', name: 'Geography 2y B' },
    { position: 9, code: '92674', name: 'Computer Science 4y C' },
    { position: 10, code: '37482', name: 'Physical Education 3y A' },
    { position: 11, code: '82917', name: 'Music 2y B' },
    { position: 12, code: '61829', name: 'Art 4y C' },
  ];

  classData: ClassDataResponse = {
    id: 0,
    className: '',
    classAccessCode: '',
    pupils: []
  };
  
  private subscription: Subscription = new Subscription;
  editClassFormController = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(5)
  ]);
  
  constructor(
    private classRequestService: ClassRequestService,
    private subjectsRequestService: SubjectsRequestService,
    private teachersRequestService: TeachersRequestService,
    private planRequestService: PlanRequestService,
    private showResponseMessageService: ShowResponseMessageService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getChoosenClass();
    this.uploadTeacherList();
    this.initAddSubjectForm();
  }

  getChoosenClass(): void {
    const state = window.history.state;
    if (state && state.chosenClass) {
        this.chosenClassId = state.chosenClass.id;
        this.getCurentClass();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  addSubject(subjectData: AddSubject): void {
    const subject: AddSubjectRequest = {
      courseName: subjectData.subject,
      teacherId: this.selectedTeacherId,
      classroomId: this.chosenClassId
    }
    this.subjectsRequestService.addSubject(subject)
    .subscribe(response => {
      this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Subject has been added successfully');
      this.initAddSubjectForm();
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
      console.log(error);
    })
  }

  initAddSubjectForm(): void {
    this.addSubjectForm = this.fb.group({
      subject: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
    });
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.subscription.add(
        this.planRequestService.setClassPlan(this.selectedFile, this.classData.id)
        .subscribe(response => {
          console.log(response);
          this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Plan has been upload successfully');

        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
        })
      )
    } else {
      console.error('No file selected.');
    }
  }

  showPupil() {}

  editClassname(): void {
    if (this.editClassFormController.valid && this.editClassFormController.value) {
      this.subscription.add(
        this.classRequestService.updateClassname(this.classData.id, this.editClassFormController.value)
        .subscribe(response => {
            console.log(response);
            this.showResponseMessageService.openDialog(ResponseMessageType.Success, 'Classname has been updated successfully');
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
          }
        )
      );
    }
  }

  getCurentClass(): void {
    this.subscription.add(
      this.classRequestService.getClassInfo(this.chosenClassId)
      .pipe(
        switchMap((classData: ClassDataResponse) => {
          this.classData = classData;
          this.pupilsList = classData.pupils;
          this.editClassFormController.patchValue(classData.className);
          return this.classRequestService.getClassInfo(classData.id);
        })
      )
      .subscribe((classData: ClassDataResponse) => {
        this.pupilsList = classData.pupils;
        console.log('pupils', this.pupilsList);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.showResponseMessageService.openDialog(ResponseMessageType.Error, error.error);
      })
    );
  }

  onTeacherSelected(selectedTeacher: string) {
    const takenTeacher: AllTeachersShortResponse = this.teacherList.find((list) => selectedTeacher === `${list.firstName} ${list.lastName}`) as AllTeachersShortResponse;
    if (takenTeacher) {
     this.selectedTeacherId = takenTeacher.id;
    }
  }

  uploadTeacherList(): void {
    this.searchTeachersList = [];
    this.subscription.add(
      this.teachersRequestService.getAllTeachers()
      .subscribe(
        (teachersList: AllTeachersShortResponse[]) => {
          teachersList.forEach(teacher => {
            this.teacherList = teachersList;
            const teacherName: string = `${teacher.firstName} ${teacher.lastName}`;
            this.searchTeachersList.push(teacherName);
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }
  
}
