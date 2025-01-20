import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmshistoryComponent } from './qmshistory.component';

describe('QmshistoryComponent', () => {
  let component: QmshistoryComponent;
  let fixture: ComponentFixture<QmshistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QmshistoryComponent]
    });
    fixture = TestBed.createComponent(QmshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
