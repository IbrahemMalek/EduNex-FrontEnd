import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  animations: [
    trigger('timerAnimation', [
      state('active', style({
        strokeDashoffset: '{{ offset }}'
      }), { params: { offset: 0 } }),
      transition('* => active', animate('1s linear'))
    ]),
    trigger('barAnimation', [
      transition(':increment', [
        style({ width: '100%' }),
        animate('1s linear')
      ])
    ])
  ]
})
export class TimerComponent implements OnInit {
  @Input() duration!: number;
  timerStarted: boolean = false;
  timerEnded: boolean = false;
  timeLeft: number = 0;
  timeLeftString!: string;
  circleOffset: number = 283; // Initial offset
  timeElapsedPercentage: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    if (this.duration) {
      this.timeLeft = this.duration;
      this.timerStarted = true;

      const countdown = setInterval(() => {
        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor((this.timeLeft % 3600) / 60);
        const seconds = this.timeLeft % 60;

        this.timeLeftString = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

        // Calculate time elapsed percentage
        this.timeElapsedPercentage = ((this.duration - this.timeLeft) / this.duration) * 100;

        // Decrement time left
        this.timeLeft--;

        // Check if time has reached 0
        if (this.timeLeft < 0) {
          clearInterval(countdown);
          this.timerEnded = true;
        }
      }, 1000);
    }
  }


  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
