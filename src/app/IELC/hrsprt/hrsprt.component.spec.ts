import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrsprtComponent } from './hrsprt.component';

describe('HrsprtComponent', () => {
  let component: HrsprtComponent;
  let fixture: ComponentFixture<HrsprtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrsprtComponent]
    });
    fixture = TestBed.createComponent(HrsprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
