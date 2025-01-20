import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmsmailsComponent } from './qmsmails.component';

describe('QmsmailsComponent', () => {
  let component: QmsmailsComponent;
  let fixture: ComponentFixture<QmsmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QmsmailsComponent]
    });
    fixture = TestBed.createComponent(QmsmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
