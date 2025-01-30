import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjsprtComponent } from './prjsprt.component';

describe('PrjsprtComponent', () => {
  let component: PrjsprtComponent;
  let fixture: ComponentFixture<PrjsprtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrjsprtComponent]
    });
    fixture = TestBed.createComponent(PrjsprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
