import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrdeptComponent } from './hrdept.component';

describe('HrdeptComponent', () => {
  let component: HrdeptComponent;
  let fixture: ComponentFixture<HrdeptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrdeptComponent]
    });
    fixture = TestBed.createComponent(HrdeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
