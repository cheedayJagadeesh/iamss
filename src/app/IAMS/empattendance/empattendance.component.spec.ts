import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpattendanceComponent } from './empattendance.component';

describe('EmpattendanceComponent', () => {
  let component: EmpattendanceComponent;
  let fixture: ComponentFixture<EmpattendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpattendanceComponent]
    });
    fixture = TestBed.createComponent(EmpattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
