import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarcmtsComponent } from './varcmts.component';

describe('VarcmtsComponent', () => {
  let component: VarcmtsComponent;
  let fixture: ComponentFixture<VarcmtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarcmtsComponent]
    });
    fixture = TestBed.createComponent(VarcmtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
