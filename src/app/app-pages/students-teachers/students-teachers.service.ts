import { Injectable } from '@angular/core';
import { UserCardData } from './students-teachers.interfaces';
import { AllPupilsShortResponse } from 'src/Interfaces/pupils-models';
import { Observable, map } from 'rxjs';
import { AllTeachersShortResponse } from 'src/Interfaces/teachers-models';

@Injectable({
  providedIn: 'root'
})
export class StudentsTeachersService {
  mapPupilsList(pupilsList: Observable<AllPupilsShortResponse[]>): Observable<UserCardData[]> {
    return pupilsList.pipe(
      map((list: AllPupilsShortResponse[]) => {
        return list.map((pupil) => ({
          id: pupil.id,
          name: pupil.firstName,
          lastname: pupil.lastName,
          specialNumber: pupil.classname
        }));
      })
    );
  }

  mapTeachersList(teachersList: Observable<AllTeachersShortResponse[]>): Observable<UserCardData[]> {
    return teachersList.pipe(
      map((list: AllTeachersShortResponse[]) => {
        return list.map((teacher) => ({
          id: teacher.id,
          name: teacher.firstName,
          lastname: teacher.lastName,
          specialNumber: teacher.quantityOfsubjects
        }));
      })
    );
  }
}
