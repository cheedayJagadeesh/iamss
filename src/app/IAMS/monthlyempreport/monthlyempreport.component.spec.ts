import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyempreportComponent } from './monthlyempreport.component';

describe('MonthlyempreportComponent', () => {
  let component: MonthlyempreportComponent;
  let fixture: ComponentFixture<MonthlyempreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyempreportComponent]
    });
    fixture = TestBed.createComponent(MonthlyempreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
