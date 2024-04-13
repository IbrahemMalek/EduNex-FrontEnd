import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-counter',
  templateUrl: './target-counter.component.html',
  styleUrls: ['./target-counter.component.css']
})
export class TargetCounterComponent implements OnInit {
  @ViewChild('teacherCounter', { static: true }) teacherCounter!: ElementRef;
  @ViewChild('courseCounter', { static: true }) courseCounter!: ElementRef;
  @ViewChild('studyHourCounter', { static: true }) studyHourCounter!: ElementRef;
  @ViewChild('studentCounter', { static: true }) studentCounter!: ElementRef;

  teacherFinalNumber = 50;
  courseFinalNumber = 70;
  studyHourFinalNumber = 90;
  studentFinalNumber = 120;

  constructor() { }

  ngOnInit(): void {
    this.observeCounters();
  }

  observeCounters() {
    this.observeCounter(this.teacherCounter.nativeElement, this.teacherFinalNumber);
    this.observeCounter(this.courseCounter.nativeElement, this.courseFinalNumber);
    this.observeCounter(this.studyHourCounter.nativeElement, this.studyHourFinalNumber);
    this.observeCounter(this.studentCounter.nativeElement, this.studentFinalNumber);
  }

  observeCounter(element: HTMLElement, finalNumber: number) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.incrementCounter(element, finalNumber);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);
  }

  incrementCounter(element: HTMLElement, finalNumber: number) {
    let count = 0;
    const interval = setInterval(() => {
      if (count < finalNumber) {
        count++;
        element.textContent = count.toString();
      } else {
        clearInterval(interval);
      }
    }, 10);
  }
}
