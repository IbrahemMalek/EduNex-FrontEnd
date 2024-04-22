import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonContentComponent } from './lesson-content.component';

describe('LessonContentComponent', () => {
  let component: LessonContentComponent;
  let fixture: ComponentFixture<LessonContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonContentComponent]
    });
    fixture = TestBed.createComponent(LessonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
