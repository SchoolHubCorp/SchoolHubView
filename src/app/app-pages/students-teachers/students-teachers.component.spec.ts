import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTeachersComponent } from './students-teachers.component';

describe('StudentsTeachersComponent', () => {
  let component: StudentsTeachersComponent;
  let fixture: ComponentFixture<StudentsTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsTeachersComponent]
    });
    fixture = TestBed.createComponent(StudentsTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
