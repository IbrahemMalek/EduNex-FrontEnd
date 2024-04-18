import { Component, Input } from '@angular/core';
import { ITeacher } from 'src/app/Model/iteacher';


@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent {
  @Input() teacher!: ITeacher;

  handleMouseMove(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;
      const shadowX = (mouseX - cardRect.width / 2) / 25;
      const shadowY = (mouseY - cardRect.height / 2) / 25;
      card.style.transform = `rotateX(${-shadowY}deg) rotateY(${shadowX}deg)`;
      // card.style.boxShadow = `${shadowX}px ${shadowY}px 0px 1px var(--border), var(--border) 0px 0px 0px 1px`;
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
