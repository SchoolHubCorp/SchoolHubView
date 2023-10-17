import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrancePagesComponent } from './entrance-pages.component';

describe('EntrancePagesComponent', () => {
  let component: EntrancePagesComponent;
  let fixture: ComponentFixture<EntrancePagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrancePagesComponent]
    });
    fixture = TestBed.createComponent(EntrancePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
