import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterOutlet, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tattoo');

  private router = inject(Router);
  private location = inject(Location);

  constructor() {
    // Drop the #fragment from the URL once we've scrolled to it, so a later
    // page refresh lands at the top instead of jumping back to that section.
    this.router.events
      .pipe(filter((event): event is Scroll => event instanceof Scroll))
      .subscribe((event) => {
        if (event.anchor) {
          const urlTree = this.router.parseUrl(event.routerEvent.url);
          urlTree.fragment = null;
          this.location.replaceState(this.router.serializeUrl(urlTree));
        }
      });
  }
}
