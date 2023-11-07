import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMessageDialogComponent } from './response-message-dialog.component';

describe('ResponseMessageDialogComponent', () => {
  let component: ResponseMessageDialogComponent;
  let fixture: ComponentFixture<ResponseMessageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseMessageDialogComponent]
    });
    fixture = TestBed.createComponent(ResponseMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
