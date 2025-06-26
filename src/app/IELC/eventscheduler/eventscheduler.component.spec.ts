import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventschedulerComponent } from './eventscheduler.component';

describe('EventschedulerComponent', () => {
  let component: EventschedulerComponent;
  let fixture: ComponentFixture<EventschedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventschedulerComponent]
    });
    fixture = TestBed.createComponent(EventschedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
