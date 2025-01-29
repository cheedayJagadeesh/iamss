import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmercntctlstComponent } from './emercntctlst.component';

describe('EmercntctlstComponent', () => {
  let component: EmercntctlstComponent;
  let fixture: ComponentFixture<EmercntctlstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmercntctlstComponent]
    });
    fixture = TestBed.createComponent(EmercntctlstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
