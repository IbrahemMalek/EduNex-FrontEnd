import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTimePickerComponent } from './data-time-picker.component';

describe('DataTimePickerComponent', () => {
  let component: DataTimePickerComponent;
  let fixture: ComponentFixture<DataTimePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTimePickerComponent]
    });
    fixture = TestBed.createComponent(DataTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
