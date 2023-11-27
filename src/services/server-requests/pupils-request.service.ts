import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AllPupilsShortResponse, PupilPrivateInfo, PupilResponse, PupilSubjectLessonsResponse, PupilSubjects } from 'src/Interfaces/pupils-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class PupilsRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

  getAllPupils(): Observable<AllPupilsShortResponse[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<AllPupilsShortResponse[]>(`${this.url}/api/Pupil`, { headers: headers });
  }

  getPupilInfo(pupilId: number): Observable<PupilResponse> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<PupilResponse>(`${this.url}/api/Pupil/${pupilId}`, { headers: headers });
  }

  deletePupil(pupilId: number): Observable<any> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.delete(`${this.url}/api/Pupil/${pupilId}`, { headers: headers, responseType: 'text' });
  }

  updatePupilInfo(pupil: PupilPrivateInfo): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      firstName: pupil.firstName,
      lastName: pupil.lastName,
      phoneNumber: pupil.phoneNumber.toString(),
      pesel: pupil.pesel
    };

    return this.http.put(`${this.url}/api/Pupil/${pupil.id}`, requestBody, { headers: headers });
  }

  updatePupilClass(pupilId: number, classroomId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      classroomId: classroomId
    };

    return this.http.put(`${this.url}/api/Pupil/${pupilId}/changePupilClass`, requestBody, { headers: headers });
  }

  getPersonalPupilSubjects(): Observable<PupilSubjects[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get<PupilSubjects[]>(`${this.url}/api/Pupil/pupilCourses`, { headers: headers });
  }

  getPupilSubjectLessons(courseId: number): Observable<PupilSubjectLessonsResponse> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<PupilSubjectLessonsResponse>(`${this.url}/api/Pupil/${courseId}/Topics`, { headers });
  }

  uploadPupilHomework(file: File, topicId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Authorization': `Bearer ${token}`,
    });
  
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.url}/api/Homework/${topicId}/submit-homework`, formData, {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map(response => response.body)
    );
  }
}
