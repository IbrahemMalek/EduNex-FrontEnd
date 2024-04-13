import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideScrollButtonsComponent } from './side-scroll-buttons.component';

describe('SideScrollButtonsComponent', () => {
  let component: SideScrollButtonsComponent;
  let fixture: ComponentFixture<SideScrollButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideScrollButtonsComponent]
    });
    fixture = TestBed.createComponent(SideScrollButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
