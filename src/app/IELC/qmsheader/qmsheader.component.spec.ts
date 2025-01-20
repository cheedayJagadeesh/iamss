import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmsheaderComponent } from './qmsheader.component';

describe('QmsheaderComponent', () => {
  let component: QmsheaderComponent;
  let fixture: ComponentFixture<QmsheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QmsheaderComponent]
    });
    fixture = TestBed.createComponent(QmsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
