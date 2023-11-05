import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassResponse } from 'src/Interfaces/plan-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class ClassRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<ClassResponse[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<ClassResponse[]>(`${this.url}/api/Classroom`, { headers: headers });
  }

  postClass(className: string): Observable<ClassResponse> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const requestBody = {
      ClassName: className
    };
  
    return this.http.post<ClassResponse>(`${this.url}/api/Classroom`, requestBody, { headers: headers });
  }

  deleteClass(classroomId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.delete(`${this.url}/api/Classroom/${classroomId}`, { headers: headers });
  }

  updateClassname(classroomId: number, className: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      className: className
    };

    return this.http.put(`${this.url}/api/Classroom/${classroomId}`, requestBody, { headers: headers });
  }

  getClassInfo(classroomId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.url}/api/Classroom/${classroomId}`, { headers: headers });
  }
}
