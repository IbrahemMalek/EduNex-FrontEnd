import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamTimeOutComponent } from '../exam-time-out/exam-time-out.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() duration!: number;
  @Input() type!: string;
  timerStarted: boolean = false;
  timerEnded: boolean = false;
  timeLeft: number = 0;
  timeLeftString!: string;
  circleOffset: number = 283;
  timeElapsedPercentage: number = 0;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) { }

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

        this.timeElapsedPercentage = ((this.duration - this.timeLeft) / this.duration) * 100;

        this.timeLeft--;

        if (this.timeLeft < 0) {
          clearInterval(countdown);
          this.timerEnded = true;
          this.openTimeOutDialog();
        }
      }, 1000);
    }
  }

  openTimeOutDialog(): void {
    this.dialog.open(ExamTimeOutComponent, {
      width: '300px',
      data: {
        message: this.type == 'exam' ? 'انتهى وقت الامتحان' : 'انتهى وقت الواجب',
        courseId: this.route.snapshot.paramMap.get('courseId'),
        lessonId: this.route.snapshot.paramMap.get('lessonId'),
      }
    });
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
