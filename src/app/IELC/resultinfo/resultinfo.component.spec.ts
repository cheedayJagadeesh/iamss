import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultinfoComponent } from './resultinfo.component';

describe('ResultinfoComponent', () => {
  let component: ResultinfoComponent;
  let fixture: ComponentFixture<ResultinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultinfoComponent]
    });
    fixture = TestBed.createComponent(ResultinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
