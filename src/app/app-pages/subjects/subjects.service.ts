import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PupilSubjectLessons, PupilSubjects } from 'src/Interfaces/pupils-models';
import { UserSubjectLessons, UserSubjectsResponse } from 'src/Interfaces/subjects-models';
import { TeacherSubjectLessons, TeachersSubjects } from 'src/Interfaces/teachers-models';

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

  mapLessons(lessons: PupilSubjectLessons[] | TeacherSubjectLessons[], role: string): Observable<UserSubjectLessons[]> {
    if (role === 'Teacher') {
      const userSubjectLessons: UserSubjectLessons[] = (lessons as TeacherSubjectLessons[]).map((lesson: TeacherSubjectLessons) => {
        return {
          topicId: lesson.topicId,
          topicName: lesson.topicName,
          topicDescription: lesson.topicDescription,
          teacherFile: lesson.teacherFile,
          teacherFileType: lesson.teacherFileType,
        };
      });
  
      return of(userSubjectLessons);
    }
    if (role === 'Pupil') {
      const userSubjectLessons: UserSubjectLessons[] = (lessons as PupilSubjectLessons[]).map((lesson: PupilSubjectLessons) => {
        return {
          topicId: lesson.topicId,
          topicName: lesson.topicName,
          topicDescription: lesson.topicDescription,
          teacherFile: lesson.teacherFile,
          teacherFileType: lesson.teacherFileType,
          homeworkId: lesson.homeworks.length > 0 ? lesson.homeworks[0].homeworkId ?? -1 : -1,
          pupilFile: lesson.homeworks.length > 0 ? lesson.homeworks[0].pupilFile : '',
          pupilFileType: lesson.homeworks.length > 0 ? lesson.homeworks[0].pupilFileType : '',
        };
      });
    
      return of(userSubjectLessons);
    }
      
    return of([]);
  }  
}
