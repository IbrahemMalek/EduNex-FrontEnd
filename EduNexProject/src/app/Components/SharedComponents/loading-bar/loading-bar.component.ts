import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
  progress: number = 0;
  loading: boolean = false;
  private routerSubscription: Subscription | undefined;
  private interval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.progress = 10;
        this.startProgressBar();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        setTimeout(() => {
          this.progress = 100;
          this.stopProgressBar();
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private startProgressBar() {
    this.interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 1;
      }
    }, 10);
  }

  private stopProgressBar() {
    clearInterval(this.interval);
    this.loading = false;
    this.progress = 0;
  }
}
