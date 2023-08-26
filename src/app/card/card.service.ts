import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export interface Users{
  name: string,
  lastName: string,
}

@Injectable({providedIn: 'root'})
export class CardService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    const a = this.http.get<Users[]>('https://localhost:7027/api/Users');
    return a;
  }
}
