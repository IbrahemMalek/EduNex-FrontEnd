import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-exam-controller',
  templateUrl: './exam-controller.component.html',
  styleUrls: ['./exam-controller.component.css']
})
export class ExamControllerComponent implements OnInit {

  @Output() sectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() saveClicked: EventEmitter<void> = new EventEmitter<void>();

  activeSection: string = '';

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.sectionChange.emit(section);
  }

  onSaveClicked(): void {
    this.saveClicked.emit();
  }

  ngOnInit(): void {
    this.setActiveSection('questionSettings')
  }
}
