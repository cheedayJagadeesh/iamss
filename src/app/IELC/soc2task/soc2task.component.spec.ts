import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soc2taskComponent } from './soc2task.component';

describe('Soc2taskComponent', () => {
  let component: Soc2taskComponent;
  let fixture: ComponentFixture<Soc2taskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Soc2taskComponent]
    });
    fixture = TestBed.createComponent(Soc2taskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
