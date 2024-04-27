import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCloudNavbarComponent } from './custom-cloud-navbar.component';

describe('CustomCloudNavbarComponent', () => {
  let component: CustomCloudNavbarComponent;
  let fixture: ComponentFixture<CustomCloudNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCloudNavbarComponent]
    });
    fixture = TestBed.createComponent(CustomCloudNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
