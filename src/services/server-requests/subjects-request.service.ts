import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddLessonRequest, AddSubjectRequest } from 'src/Interfaces/subjects-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

  addSubject(subject: AddSubjectRequest): Observable<any> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const requestBody = {
      courseName: subject.courseName,
      classroomId: subject.classroomId,
      teacherId: subject.teacherId
    };
  
    return this.http.post<any>(`${this.url}/api/Course`, requestBody, { headers: headers });
  }

  deleteSubject(courseId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.delete(`${this.url}/api/Course/${courseId}`, { headers: headers, responseType: 'text' });
  }

  addLesson(lesson: AddLessonRequest): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      topicName: lesson.topicName,
      description: lesson.description,
      courseId: lesson.courseId
    };
    
    return this.http.post<any>(`${this.url}/api/Topic`, requestBody, { headers: headers });
  }

  deleteLesson(topicId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.delete(`${this.url}/api/Topic/${topicId}`, { headers: headers, responseType: 'text' });
  }
}
