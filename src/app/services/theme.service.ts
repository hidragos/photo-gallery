import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// theme.service.ts
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    // Check if we're running in the browser
    if (typeof window !== 'undefined') {
      // Check localStorage or system preference
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      const isDarkMode =
        savedTheme === 'dark' || (savedTheme === null && prefersDark);
      this.setTheme(isDarkMode);
    }
  }

  toggleTheme(): void {
    this.setTheme(!this.darkMode.value);
  }

  private setTheme(isDark: boolean): void {
    this.darkMode.next(isDark);

    if (typeof document !== 'undefined') {
      if (isDark) {
        this.renderer.addClass(document.body, 'dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
