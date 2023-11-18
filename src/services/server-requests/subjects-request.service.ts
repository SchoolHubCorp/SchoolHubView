import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSubjectRequest } from 'src/Interfaces/subjects-models';
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
}
