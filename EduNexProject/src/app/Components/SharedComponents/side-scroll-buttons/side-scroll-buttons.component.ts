// side-scroll-buttons.component.ts
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-scroll-buttons',
  templateUrl: './side-scroll-buttons.component.html',
  styleUrls: ['./side-scroll-buttons.component.css']
})
export class SideScrollButtonsComponent implements AfterViewInit {
  @Input() sectionName!: string;
  showLeftButton = false;
  showRightButton = false;

  ngAfterViewInit(): void {
    this.updateButtonVisibility();
    const container = document.querySelector(`.${this.sectionName}`) as HTMLElement;
    if (container) {
      container.addEventListener('scroll', () => {
        this.updateButtonVisibility();
      });
    }
    window.addEventListener('scroll', () => {
      this.updateButtonVisibility();
    });
  }

  private updateButtonVisibility(): void {
    const container = document.querySelector(`.${this.sectionName}`) as HTMLElement;
    if (container) {
      this.showRightButton = container.scrollLeft < 0;
      this.showLeftButton = container.scrollLeft > -(container.scrollWidth - container.clientWidth);
    }
  }

  scrollCards(direction: number): void {
    const container = document.querySelector(`.${this.sectionName}`) as HTMLElement;
    if (container) {
      const scrollAmount = 600;
      const newPosition = container.scrollLeft + scrollAmount * direction;
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  }
}
