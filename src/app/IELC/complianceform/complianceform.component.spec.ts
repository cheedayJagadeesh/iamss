import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceformComponent } from './complianceform.component';

describe('ComplianceformComponent', () => {
  let component: ComplianceformComponent;
  let fixture: ComponentFixture<ComplianceformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceformComponent]
    });
    fixture = TestBed.createComponent(ComplianceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
