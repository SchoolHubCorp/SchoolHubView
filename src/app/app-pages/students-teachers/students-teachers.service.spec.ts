import { TestBed } from '@angular/core/testing';

import { StudentsTeachersService } from './students-teachers.service';

describe('StudentsTeachersService', () => {
  let service: StudentsTeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsTeachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
