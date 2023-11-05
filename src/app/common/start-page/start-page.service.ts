import { Injectable } from '@angular/core';

import * as schoolData from '../../../stub/school-description.json';
import { Observable, of } from 'rxjs';
import { SchoolDescription } from 'src/Interfaces/login-models';

@Injectable({
  providedIn: 'root'
})
export class StartPageService {
  data = schoolData;

  constructor() {};

  getSchoolInfo(): Observable<SchoolDescription> {
    return of(this.data.school);
  }
}
