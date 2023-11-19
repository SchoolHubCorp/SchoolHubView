import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegisterTeacher } from 'src/Interfaces/login-models';
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
    
    return this.http.get<AllTeachersShortResponse[]>(`${this.url}/api/Teacher`, { headers: headers });
  }

  getTeacherInfo(teacherId: number): Observable<TeacherResponse> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<TeacherResponse>(`${this.url}/api/Teacher/${teacherId}`, { headers: headers });
  }

  updateTeacherInfo(teacher: TeacherPrivateInfo): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      phoneNumber: teacher.phoneNumber.toString(),
      pesel: teacher.pesel
    };

    return this.http.put(`${this.url}/api/Teacher/${teacher.id}`, requestBody, { headers: headers });
  }

  deleteTeacher(teacherId: number): Observable<string> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.delete<string>(`${this.url}/api/Teacher/${teacherId}`, { headers: headers });
  }

  setTeacherPlan(file: File, teacehrId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Authorization': `Bearer ${token}`,
    });
  
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.url}/api/Teacher/${teacehrId}/plan`, formData, {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map(response => response.body)
    );
  }

  registerTeacher(registerTeacher: RegisterTeacher): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = registerTeacher;

    return this.http.post<any>(`${this.url}/api/Teacher/register/teacher`, requestBody, { headers: headers });
  }
}
