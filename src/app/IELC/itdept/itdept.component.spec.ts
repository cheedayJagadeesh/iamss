import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItdeptComponent } from './itdept.component';

describe('ItdeptComponent', () => {
  let component: ItdeptComponent;
  let fixture: ComponentFixture<ItdeptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItdeptComponent]
    });
    fixture = TestBed.createComponent(ItdeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
