import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewskillComponent } from './addnewskill.component';

describe('AddnewskillComponent', () => {
  let component: AddnewskillComponent;
  let fixture: ComponentFixture<AddnewskillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewskillComponent]
    });
    fixture = TestBed.createComponent(AddnewskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
