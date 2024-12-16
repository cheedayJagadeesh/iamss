import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillqaComponent } from './skillqa.component';

describe('SkillqaComponent', () => {
  let component: SkillqaComponent;
  let fixture: ComponentFixture<SkillqaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillqaComponent]
    });
    fixture = TestBed.createComponent(SkillqaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
