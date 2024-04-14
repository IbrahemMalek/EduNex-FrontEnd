import { Component, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  templateUrl: './scroll-to-top-button.component.html',
  styleUrls: ['./scroll-to-top-button.component.css']
})
export class ScrollToTopButtonComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() {
    const scrollTopBtn = document.querySelector<HTMLElement>('.js-scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const progressPath = document.querySelector<SVGPathElement>('.scroll-top path');
      if (progressPath) {
        const pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.webkitTransition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength.toString();
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.webkitTransition = 'stroke-dashoffset 10ms linear';

        const updateProgress = () => {
          const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

          const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );

          const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

          const height = docHeight - windowHeight;
          const progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress.toString();
        };

        updateProgress();
        const offset = 100;

        window.addEventListener('scroll', () => {
          updateProgress();

          const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          scrollPos > offset ? scrollTopBtn.classList.add('is-active') : scrollTopBtn.classList.remove('is-active');
        }, false);
      }
    }
  }
}
