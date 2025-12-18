import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmsqmssupportComponent } from './ismsqmssupport.component';

describe('IsmsqmssupportComponent', () => {
  let component: IsmsqmssupportComponent;
  let fixture: ComponentFixture<IsmsqmssupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsmsqmssupportComponent]
    });
    fixture = TestBed.createComponent(IsmsqmssupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
