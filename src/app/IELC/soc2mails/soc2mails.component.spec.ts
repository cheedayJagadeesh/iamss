import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soc2mailsComponent } from './soc2mails.component';

describe('Soc2mailsComponent', () => {
  let component: Soc2mailsComponent;
  let fixture: ComponentFixture<Soc2mailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Soc2mailsComponent]
    });
    fixture = TestBed.createComponent(Soc2mailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
