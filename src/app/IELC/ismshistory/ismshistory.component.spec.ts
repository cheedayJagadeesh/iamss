import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmshistoryComponent } from './ismshistory.component';

describe('IsmshistoryComponent', () => {
  let component: IsmshistoryComponent;
  let fixture: ComponentFixture<IsmshistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsmshistoryComponent]
    });
    fixture = TestBed.createComponent(IsmshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
