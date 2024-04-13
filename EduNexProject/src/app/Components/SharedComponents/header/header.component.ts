import { Component, HostBinding, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0%)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  theme = new FormControl(false);
  @HostBinding('class') className = '';
  @ViewChild('sidenav') sidenav!: MatDrawer;
  @ViewChild('overlay') overlay!: ElementRef;

  darkClass = 'theme-dark';
  lightClass = 'theme-light';
  showFiller = false;
  isShowing: boolean = false;

  constructor(private renderer: Renderer2) { }

  toggleRightSidenav() {
    this.isShowing = !this.isShowing;
  }

  ngOnInit(): void {
    this.applyTheme(this.theme.value);
    this.theme.valueChanges.subscribe((currentTheme) => {
      this.applyTheme(currentTheme);
    });

    // Add click event listener to overlay to close side nav
    this.renderer.listen('document', 'click', (event) => {
      if (this.isShowing && !this.overlay.nativeElement.contains(event.target) && !this.sidenav.opened) {
        this.toggleRightSidenav();
      }
    });
  }

  private applyTheme(currentTheme: boolean | null): void {
    if (currentTheme === null) {
      currentTheme = false;
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
