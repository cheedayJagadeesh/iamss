import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmstaskComponent } from './ismstask.component';

describe('IsmstaskComponent', () => {
  let component: IsmstaskComponent;
  let fixture: ComponentFixture<IsmstaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsmstaskComponent]
    });
    fixture = TestBed.createComponent(IsmstaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
