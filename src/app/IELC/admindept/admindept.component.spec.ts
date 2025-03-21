import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindeptComponent } from './admindept.component';

describe('AdmindeptComponent', () => {
  let component: AdmindeptComponent;
  let fixture: ComponentFixture<AdmindeptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindeptComponent]
    });
    fixture = TestBed.createComponent(AdmindeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
