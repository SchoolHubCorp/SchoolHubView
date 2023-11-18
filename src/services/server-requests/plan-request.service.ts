import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class PlanRequestService {
  url: string = SERVICE_URL;
  
  constructor(private http: HttpClient) { }

  getPupilPlan(): Observable<ArrayBuffer> {
    const token = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.get(`${this.url}/api/Pupil/plan`, {
      headers: headers,
      responseType: 'arraybuffer'
    });
  }  

  getTeacherPlan(teacehrId: number): Observable<ArrayBuffer> {
    const token = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.get(`${this.url}/api/Teacher/${teacehrId}/plan`, {
      headers: headers,
      responseType: 'arraybuffer'
    });
  }

  setClassPlan(file: File, classroomId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Authorization': `Bearer ${token}`,
    });
  
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.url}/api/Classroom/${classroomId}/plan`, formData, {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map(response => response.body)
    );
  }
}
