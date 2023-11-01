import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassResponse } from 'src/Interfaces/plan-module';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class PlanRequestService {
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
}
