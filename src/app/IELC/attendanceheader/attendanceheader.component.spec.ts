import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceheaderComponent } from './attendanceheader.component';

describe('AttendanceheaderComponent', () => {
  let component: AttendanceheaderComponent;
  let fixture: ComponentFixture<AttendanceheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceheaderComponent]
    });
    fixture = TestBed.createComponent(AttendanceheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
