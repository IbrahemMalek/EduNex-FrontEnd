import { Component, HostBinding, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('closed', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('open <=> closed', [
        animate('400ms ease-in-out')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  theme = new FormControl(false);
  @HostBinding('class') className = '';
  @ViewChild('sidenav') sidenav!: MatDrawer;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('toggleCheckbox') toggleCheckbox!: ElementRef<HTMLInputElement>;

  darkClass = 'theme-dark';
  lightClass = 'theme-light';
  isShowing: boolean = false;

  constructor(private renderer: Renderer2, public loader: LoadingBarService) { }

  toggleRightSidenav() {
    this.isShowing = !this.isShowing;
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('themePreference');
    const currentTheme = savedTheme === 'dark';

    this.applyTheme(currentTheme);

    this.theme.valueChanges.subscribe((currentTheme) => {
      this.applyTheme(currentTheme);
    });

    if (this.overlay && this.sidenav) {
      this.renderer.listen('document', 'click', (event) => {
        if (this.isShowing && !this.overlay.nativeElement.contains(event.target) && !this.sidenav.opened) {
          this.toggleRightSidenav();
        }
      });
    }

    // Move marker to the button with the 'active' class
    setTimeout(() => {
      const activeButton = document.querySelector('.nav-items button.active') as HTMLElement;
      if (activeButton) {
        this.moveMarker(activeButton);
      }
    });
  }


  ngAfterViewInit(): void {
    if (localStorage.getItem('themePreference') === 'dark') {
      this.toggleCheckbox.nativeElement.checked = true;
    }
  }

  private applyTheme(currentTheme: boolean | null): void {
    if (currentTheme === null) {
      currentTheme = false;
    }

    localStorage.setItem('themePreference', currentTheme ? 'dark' : 'light');

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

  moveMarker(target: EventTarget | null): void {
    const marker = document.getElementById('marker');
    if (marker && target instanceof HTMLElement) {
      const rect = target.getBoundingClientRect();
      const offsetX = rect.left + window.pageXOffset;
      const targetWidth = target.offsetWidth;
      marker.style.width = targetWidth + 'px';
      marker.style.left = offsetX + 'px';
    }
  }

}
