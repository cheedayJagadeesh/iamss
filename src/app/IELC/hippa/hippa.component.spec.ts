import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HippaComponent } from './hippa.component';

describe('HippaComponent', () => {
  let component: HippaComponent;
  let fixture: ComponentFixture<HippaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HippaComponent]
    });
    fixture = TestBed.createComponent(HippaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
