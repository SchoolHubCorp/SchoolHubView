import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE_URL } from 'src/constants/service';

@Injectable({
  providedIn: 'root'
})
export class PupilRequestService {
  url: string = SERVICE_URL;

  constructor(private http: HttpClient) { }

}
