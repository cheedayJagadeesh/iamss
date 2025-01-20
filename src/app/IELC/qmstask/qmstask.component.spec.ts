import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmstaskComponent } from './qmstask.component';

describe('QmstaskComponent', () => {
  let component: QmstaskComponent;
  let fixture: ComponentFixture<QmstaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QmstaskComponent]
    });
    fixture = TestBed.createComponent(QmstaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
