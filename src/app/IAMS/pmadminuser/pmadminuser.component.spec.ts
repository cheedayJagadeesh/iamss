import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmadminuserComponent } from './pmadminuser.component';

describe('PmadminuserComponent', () => {
  let component: PmadminuserComponent;
  let fixture: ComponentFixture<PmadminuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PmadminuserComponent]
    });
    fixture = TestBed.createComponent(PmadminuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
