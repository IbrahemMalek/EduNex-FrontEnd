import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetCounterComponent } from './target-counter.component';

describe('TargetCounterComponent', () => {
  let component: TargetCounterComponent;
  let fixture: ComponentFixture<TargetCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetCounterComponent]
    });
    fixture = TestBed.createComponent(TargetCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
