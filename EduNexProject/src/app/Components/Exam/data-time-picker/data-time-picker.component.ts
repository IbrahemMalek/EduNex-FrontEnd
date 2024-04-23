import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-data-time-picker',
  templateUrl: './data-time-picker.component.html',
  styleUrls: ['./data-time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataTimePickerComponent),
      multi: true
    }
  ]
})
export class DataTimePickerComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @Input() disabled: boolean = false;
  selectedDate!: Date;
  selectedTime!: string;
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  writeValue(value: any): void {
    // Write the value to the component's properties
    // You may need to handle different types of values here
    if (value instanceof Date) {
      this.selectedDate = value;
      this.selectedTime = value.toTimeString().substring(0, 5);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implement methods to handle value changes
  onDateChange(date: Date) {
    this.selectedDate = date;
    this.onChange(this.selectedDate);
  }

  onTimeChange(time: string) {
    this.selectedTime = time;
    // Combine date and time to create a new Date object
    const combinedDateTime = new Date(`${this.selectedDate.toISOString().substring(0, 10)}T${time}`);
    this.onChange(combinedDateTime);
  }
}
