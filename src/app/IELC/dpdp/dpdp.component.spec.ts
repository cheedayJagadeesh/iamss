import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdpComponent } from './dpdp.component';

describe('DpdpComponent', () => {
  let component: DpdpComponent;
  let fixture: ComponentFixture<DpdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DpdpComponent]
    });
    fixture = TestBed.createComponent(DpdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
