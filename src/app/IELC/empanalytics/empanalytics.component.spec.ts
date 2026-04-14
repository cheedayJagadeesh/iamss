import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpanalyticsComponent } from './empanalytics.component';

describe('EmpanalyticsComponent', () => {
  let component: EmpanalyticsComponent;
  let fixture: ComponentFixture<EmpanalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpanalyticsComponent]
    });
    fixture = TestBed.createComponent(EmpanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
