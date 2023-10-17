import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPostData, RegisterPostData } from 'src/Interfaces/login-module';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {
  url: string = 'https://localhost:7027/api';
  constructor(private http: HttpClient) {}

  loginUser(loginData: LoginPostData): Observable<LoginPostData> {
    return this.http.post<LoginPostData>(`${this.url}/Users/login`, loginData);
  }

  registerUser(registerData: RegisterPostData): Observable<RegisterPostData> {
    return this.http.post<RegisterPostData>(`${this.url}/Users/register/pupil`, registerData);
  }

  registerParent(registerData: RegisterPostData): Observable<RegisterPostData> {
    return this.http.post<RegisterPostData>(`${this.url}/Users/register/parent`, registerData);
  }
}
