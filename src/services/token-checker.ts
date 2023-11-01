import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckerService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
  ) { }

  isUserLogin(): boolean {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('user_role');

    if (token && role && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } 

    return false;
  }
  
  getAuthUserRole(): string | null {
    const role = localStorage.getItem('user_role');

    if (this.isUserLogin()) {
      return role;
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return null;
    }
  }
}
