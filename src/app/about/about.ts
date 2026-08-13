import { Component, ElementRef, afterNextRender, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  imageEl = viewChild<ElementRef<HTMLElement>>('imageEl');
  imageRevealed = signal(false);

  constructor() {
    afterNextRender(() => {
      const el = this.imageEl()?.nativeElement;
      if (!el) return;

      const isInView = () => {
        const rect = el.getBoundingClientRect();
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        return visible > rect.height * 0.3;
      };

      const reveal = () => {
        this.imageRevealed.set(true);
        window.removeEventListener('scroll', onScroll);
      };

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (isInView()) reveal();
        });
      };

      if (isInView()) {
        reveal();
      } else {
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    });
  }
}
