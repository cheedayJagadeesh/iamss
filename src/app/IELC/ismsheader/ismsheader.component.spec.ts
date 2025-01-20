import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmsheaderComponent } from './ismsheader.component';

describe('IsmsheaderComponent', () => {
  let component: IsmsheaderComponent;
  let fixture: ComponentFixture<IsmsheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsmsheaderComponent]
    });
    fixture = TestBed.createComponent(IsmsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
