import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GradeTable } from 'src/Interfaces/marks-models';
import { TokenCheckerService } from 'src/services/token-checker';
import { UserRole } from '../subjects/subjects.component';
import { PupilsRequestService } from 'src/services/server-requests/pupils-request.service';
import { TeachersRequestService } from 'src/services/server-requests/teachers-request.service';
import { TeachersSubjects } from 'src/Interfaces/teachers-models';
import { HttpErrorResponse } from '@angular/common/http';
import { AllPupilsShortResponse } from 'src/Interfaces/pupils-models';
import { MarksRequestService } from 'src/services/server-requests/marks-request.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  dataSource!: GradeTable[];
  maxMarksLength!: number;
  columns!: number[];
  displayedColumns!: string[];
  userRole!: string;
  autocompleteLabel!: string;
  searchList: string[] = [];
  pupilsList: AllPupilsShortResponse[] = [];
  classesList: TeachersSubjects[] = [];
  selectedItem!: number;
  mainColumnName!: string;
  markTable!: GradeTable[];

  constructor(
    private tokenCheckerService: TokenCheckerService,
    private pupilsRequestService: PupilsRequestService,
    private teachersRequestService: TeachersRequestService,
    private marksRequestService: MarksRequestService,
  ){}

  ngOnInit(): void {
    this.userRole = this.tokenCheckerService.getAuthUserRole() as string;
    this.setTable();
    this.getPupilMarks();
    this.setAutocomplete();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setTable(): void {
    if (this.markTable) {
      this.dataSource = this.markTable;
      const maxMarksLength = this.dataSource.reduce((max, current) => Math.max(max, current.marks.length), 0);
      this.columns = Array.from({ length: maxMarksLength }, (_, index) => index);
      this.displayedColumns = ['name', ...this.columns.map(column => column.toString())];
  
    } else {
      this.columns = [];
      this.displayedColumns = [];
    }
   
    if (this.userRole === UserRole.Teacher) {
      this.mainColumnName = 'Pupil';
    } else {
      this.mainColumnName = 'Subject';
    }
  }

  setAutocomplete(): void {
    if (this.userRole === UserRole.Teacher) {
      this.autocompleteLabel = 'Subject';

      this.subscription.add(
        this.teachersRequestService.getPersonalTeacherSubjects()
        .subscribe(response => {
            this.classesList = response;
            this.searchList = this.classesList.map(element => element.courseName);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      );
    }
    if (this.userRole === UserRole.Admin) {
      this.autocompleteLabel = 'Pupil';

      this.subscription.add(
        this.pupilsRequestService.getAllPupils()
          .subscribe(response => {
            this.pupilsList = response;
            this.searchList = this.pupilsList.map(element => `${element.firstName} ${element.lastName}`);
          },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          )
      )
    }
  }

  onSelected(selectedItem: string) {
    if (this.userRole === UserRole.Teacher) {
      const takenClass = this.classesList.find((list) => selectedItem === list.courseName);
      this.selectedItem = takenClass?.id as number;
      this.getMarks(this.selectedItem);
      this.setTable();
    }
    if (this.userRole === UserRole.Admin) {
      const takenPupil = this.pupilsList.find((list) => selectedItem === `${list.firstName} ${list.lastName}`);
      this.selectedItem = takenPupil?.id as number;
      this.getMarks(this.selectedItem);
      this.setTable();
    }
  }

  getMarks(selectedItemId?: number): void {
    if (this.userRole === UserRole.Teacher && selectedItemId) {
      this.subscription.add(
        this.marksRequestService.getMarksForTeacher(selectedItemId)
        .subscribe(response => {
          this.markTable = response.map(pupilGrade => {
            return {
              rowName: `${pupilGrade.pupilName} ${pupilGrade.pupilSurname}`,
              marks: pupilGrade.marks
            };
          });
        },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      )
    }
    if (this.userRole === UserRole.Admin && selectedItemId) {
      this.subscription.add(
        this.marksRequestService.getMarksForAdmin(selectedItemId)
        .subscribe(response => {
          this.markTable = response.map(pupilGrade => {
            return {
              rowName: `${pupilGrade.courseName}`,
              marks: pupilGrade.marks
            };
          });
        },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      )
    }
  }

  getPupilMarks(): void {
    if (this.userRole === UserRole.Pupil) {
      this.subscription.add(
        this.marksRequestService.getMarksForPupil(5)
          .subscribe(response => {
            this.markTable = response.map(pupilGrade => {
              return {
                rowName: `${pupilGrade.courseName}`,
                marks: pupilGrade.marks
              };
            });
            this.setTable();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      );
    }
  }
}
