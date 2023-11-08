import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllTeachersShortResponse, TeacherPrivateInfo, TeacherResponse } from 'src/Interfaces/teachers-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class TeachersRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<AllTeachersShortResponse[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<AllTeachersShortResponse[]>(`${this.url}/api/Teachers`, { headers: headers });
  }

  getTeacherInfo(teacherId: number): Observable<TeacherResponse> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<TeacherResponse>(`${this.url}/api/Teachers/${teacherId}`, { headers: headers });
  }

  addTeacher(teacher: TeacherPrivateInfo): Observable<any> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const requestBody = {
      teacher: teacher
    };
  
    return this.http.post<any>(`${this.url}/api/Teachers`, requestBody, { headers: headers });
  }

  updateTeacherInfo(teacher: TeacherPrivateInfo): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      teacher: teacher
    };

    return this.http.put(`${this.url}/api/Teacher/${teacher.id}`, requestBody, { headers: headers });
  }

  deleteTeacher(teacherId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.delete(`${this.url}/api/Teachers/${teacherId}`, { headers: headers });
  }
}
