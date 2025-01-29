import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsprtComponent } from './adminsprt.component';

describe('AdminsprtComponent', () => {
  let component: AdminsprtComponent;
  let fixture: ComponentFixture<AdminsprtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsprtComponent]
    });
    fixture = TestBed.createComponent(AdminsprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
