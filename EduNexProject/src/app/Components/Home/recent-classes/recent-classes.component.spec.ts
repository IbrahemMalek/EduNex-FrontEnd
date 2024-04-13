import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentClassesComponent } from './recent-classes.component';

describe('RecentClassesComponent', () => {
  let component: RecentClassesComponent;
  let fixture: ComponentFixture<RecentClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentClassesComponent]
    });
    fixture = TestBed.createComponent(RecentClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
