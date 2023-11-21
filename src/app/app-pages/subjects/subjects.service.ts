import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PupilSubjects } from 'src/Interfaces/pupils-models';
import { UserSubjectsResponse } from 'src/Interfaces/subjects-models';
import { TeachersSubjects } from 'src/Interfaces/teachers-models';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  mapPupilsList(pupilSubjectsList: Observable<PupilSubjects[]>): Observable<UserSubjectsResponse[]> {
    return pupilSubjectsList.pipe(
      map((list: PupilSubjects[]) => {
        return list.map((subject) => ({
          id: subject.id,
          courseName: subject.courseName,
          specialParam: subject.teacherName + ' ' + subject.teacherLastName
        }));
      })
    );
  }

  mapTeachersList(teacherSubjectsList: Observable<TeachersSubjects[]>): Observable<UserSubjectsResponse[]> {
    return teacherSubjectsList.pipe(
      map((list: TeachersSubjects[]) => {
        return list.map((subject) => ({
          id: subject.id,
          courseName: subject.courseName,
          specialParam: subject.className
        }));
      })
    );
  }
}
