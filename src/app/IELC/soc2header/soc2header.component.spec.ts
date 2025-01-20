import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soc2headerComponent } from './soc2header.component';

describe('Soc2headerComponent', () => {
  let component: Soc2headerComponent;
  let fixture: ComponentFixture<Soc2headerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Soc2headerComponent]
    });
    fixture = TestBed.createComponent(Soc2headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
