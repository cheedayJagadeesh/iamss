import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISMSMasterComponent } from './ismsmaster.component';

describe('ISMSMasterComponent', () => {
  let component: ISMSMasterComponent;
  let fixture: ComponentFixture<ISMSMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ISMSMasterComponent]
    });
    fixture = TestBed.createComponent(ISMSMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
