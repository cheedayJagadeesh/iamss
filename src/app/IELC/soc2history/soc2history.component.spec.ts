import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soc2historyComponent } from './soc2history.component';

describe('Soc2historyComponent', () => {
  let component: Soc2historyComponent;
  let fixture: ComponentFixture<Soc2historyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Soc2historyComponent]
    });
    fixture = TestBed.createComponent(Soc2historyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
