import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EntranceResponse, LoginPostData, RegisterPostData, RegisterTeacher } from 'src/Interfaces/login-models';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {
  private readonly loginUserData: Subject<string> = new Subject<string>;
  public loginUserData$: Observable<string> = this.loginUserData.asObservable();

  url: string = SERVICE_URL;
  constructor(private http: HttpClient) {}

  loginUser(loginData: LoginPostData): Observable<EntranceResponse> {
    return this.http.post<EntranceResponse>(`${this.url}/api/Users/Login`, loginData);
  }

  registerUser(registerData: RegisterPostData): Observable<EntranceResponse> {
    return this.http.post<EntranceResponse>(`${this.url}/api/Users/register/pupil`, registerData);
  }

  registerParent(registerData: RegisterPostData): Observable<EntranceResponse> {
    return this.http.post<EntranceResponse>(`${this.url}/api/Users/register/parent`, registerData);
  }
}
