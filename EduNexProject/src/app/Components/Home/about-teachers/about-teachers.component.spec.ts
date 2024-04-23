import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeachersComponent } from './about-teachers.component';

describe('AboutTeachersComponent', () => {
  let component: AboutTeachersComponent;
  let fixture: ComponentFixture<AboutTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutTeachersComponent]
    });
    fixture = TestBed.createComponent(AboutTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
