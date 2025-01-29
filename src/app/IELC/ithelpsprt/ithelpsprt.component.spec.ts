import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IthelpsprtComponent } from './ithelpsprt.component';

describe('IthelpsprtComponent', () => {
  let component: IthelpsprtComponent;
  let fixture: ComponentFixture<IthelpsprtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IthelpsprtComponent]
    });
    fixture = TestBed.createComponent(IthelpsprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
