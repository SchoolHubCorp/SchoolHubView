import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPupilsShortResponse, PupilPrivateInfo, PupilResponse } from 'src/Interfaces/pupils-models';
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
    
    return this.http.get<AllPupilsShortResponse[]>(`${this.url}/api/Pupils`, { headers: headers });
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
    
    return this.http.delete(`${this.url}/api/Pupil/${pupilId}`, { headers: headers });
  }

  updatePupilInfo(pupil: PupilPrivateInfo): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      pupil: pupil
    };

    return this.http.put(`${this.url}/api/Teacher/${pupil.id}`, requestBody, { headers: headers });
  }

  uodatePupilClass(pupilId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Accept' : '*/*',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const requestBody = {
      pupilId: pupilId
    };

    return this.http.put(`${this.url}/api/PupilClass/${pupilId}`, requestBody, { headers: headers });
  }
}
