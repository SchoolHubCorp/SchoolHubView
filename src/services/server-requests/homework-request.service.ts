import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homeworks } from 'src/Interfaces/homework-models';
import { ClassResponse } from 'src/Interfaces/plan-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class HomeworkRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

  getHomework(topicId : number): Observable<Homeworks[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<Homeworks[]>(`${this.url}/api/Homework/${ topicId }/Homeworks`, { headers: headers });
  }

  postMark(homeworkId: number, pupilId: number, markName: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const requestBody = {
      markName: markName
    };
  
    return this.http.post<ClassResponse>(`${this.url}/api/Mark/${homeworkId}/placeMark?pupilId=${pupilId}`, requestBody, { headers: headers });
  }
}
