import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmsmailsComponent } from './ismsmails.component';

describe('IsmsmailsComponent', () => {
  let component: IsmsmailsComponent;
  let fixture: ComponentFixture<IsmsmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsmsmailsComponent]
    });
    fixture = TestBed.createComponent(IsmsmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
