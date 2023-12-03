import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseGradeTable, PupilGradeTable } from 'src/Interfaces/marks-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class MarksRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

  getMarksForTeacher(courseId: number): Observable<PupilGradeTable[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<PupilGradeTable[]>(`${this.url}/api/Mark/${courseId}/studentMarksTeacher`, { headers: headers });
  }

  getMarksForPupil(): Observable<CourseGradeTable[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<CourseGradeTable[]>(`${this.url}/api/Mark/studentMarksPupil`, { headers: headers });
  }

  getMarksForAdmin(pupilId: number): Observable<CourseGradeTable[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<CourseGradeTable[]>(`${this.url}/api/Mark/${pupilId}/studentMarksAdmin`, { headers: headers });
  }
}
