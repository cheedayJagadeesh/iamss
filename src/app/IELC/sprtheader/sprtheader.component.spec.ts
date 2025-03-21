import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprtheaderComponent } from './sprtheader.component';

describe('SprtheaderComponent', () => {
  let component: SprtheaderComponent;
  let fixture: ComponentFixture<SprtheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprtheaderComponent]
    });
    fixture = TestBed.createComponent(SprtheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
