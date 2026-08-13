import { Component, signal, input, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  navLabel = input('Portfolio');
  navHref = input('/portfolio');
  solid = input(false);
  isMenuOpen = signal(false);

  private document = inject(DOCUMENT);

  toggleMenu(): void {
    const next = !this.isMenuOpen();
    this.isMenuOpen.set(next);
    this.document.body.style.overflow = next ? 'hidden' : '';
  }
}
