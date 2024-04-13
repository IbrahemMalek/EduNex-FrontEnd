import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRankComponent } from './class-rank.component';

describe('ClassRankComponent', () => {
  let component: ClassRankComponent;
  let fixture: ComponentFixture<ClassRankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassRankComponent]
    });
    fixture = TestBed.createComponent(ClassRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
