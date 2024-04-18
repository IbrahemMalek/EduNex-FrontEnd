import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  theme = new FormControl(false);
  @HostBinding('class') className = '';
  @ViewChild('sidenav') sidenav!: MatSidenav;

  darkClass = 'theme-dark';
  lightClass = 'theme-light';
  showFiller = false;
  isShowing: boolean = false;

  toggleRightSidenav() {
    this.isShowing = !this.isShowing;
  }

  // callMethods() {
  //   this.toggleSidenav();
  // }

  constructor() { }

  ngOnInit(): void {
    this.applyTheme(this.theme.value);
    this.theme.valueChanges.subscribe((currentTheme) => {
      this.applyTheme(currentTheme);
    });
  }

  private applyTheme(currentTheme: boolean | null): void {
    if (currentTheme === null) { // Handle null value
      currentTheme = false; // Set default value to false
    }

    this.className = currentTheme ? this.darkClass : this.lightClass;
    const bodyElement = document.getElementsByTagName('body')[0];

    if (currentTheme) {
      bodyElement.classList.add(this.darkClass);
      bodyElement.classList.remove(this.lightClass);
    } else {
      bodyElement.classList.add(this.lightClass);
      bodyElement.classList.remove(this.darkClass);
    }
  }

}
