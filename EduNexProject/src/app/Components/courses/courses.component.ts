// courses.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  panelOpenState = false;

  handleMouseMove(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;
      const shadowX = (mouseX - cardRect.width / 2) / 35;
      const shadowY = (mouseY - cardRect.height / 2) / 35;
      card.style.transform = `rotateX(${-shadowY}deg) rotateY(${shadowX}deg)`;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 0px 1px var(--border), var(--border) 0px 0px 0px 1px`;
    }
  }



  handleMouseLeave(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = ''
    }
  }
}
