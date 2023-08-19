import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToSchoolComponent } from './login-to-school.component';

describe('LoginToSchoolComponent', () => {
  let component: LoginToSchoolComponent;
  let fixture: ComponentFixture<LoginToSchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginToSchoolComponent]
    });
    fixture = TestBed.createComponent(LoginToSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
