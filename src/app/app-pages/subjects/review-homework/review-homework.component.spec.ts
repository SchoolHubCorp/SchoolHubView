import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHomeworkComponent } from './review-homework.component';

describe('ReviewHomeworkComponent', () => {
  let component: ReviewHomeworkComponent;
  let fixture: ComponentFixture<ReviewHomeworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewHomeworkComponent]
    });
    fixture = TestBed.createComponent(ReviewHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
