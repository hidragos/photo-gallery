import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <header>
        <h1>this is my microphone</h1>
        <nav>
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Gallery</a
          >
          <a routerLink="/albums" routerLinkActive="active">Albums</a>

          <button
            class="theme-toggle"
            (click)="toggleTheme()"
            aria-label="Toggle theme"
          >
            <svg
              *ngIf="themeService.darkMode$ | async; else lightIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <ng-template #lightIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                ></path>
              </svg>
            </ng-template>
          </button>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        <p>© 2025 Photography Portfolio</p>
      </footer>
    </div>
  `,
  styles: [
    `
      :root {
        --bg-primary: #ffffff;
        --bg-secondary: #f5f5f5;
        --text-primary: #333333;
        --text-secondary: #666666;
        --accent: #3f51b5;
        --accent-light: rgba(63, 81, 181, 0.1);
        --accent-dark: #303f9f;
        --border-color: #e0e0e0;
        --card-bg: #ffffff;
        --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        --card-shadow-hover: rgba(0, 0, 0, 0.15);
        --dialog-bg: rgba(0, 0, 0, 0.85);
        --dialog-text: #ffffff;
        --scroll-thumb: #cccccc;
        --scroll-track: #f5f5f5;
      }

      .dark-theme {
        --bg-primary: #121212;
        --bg-secondary: #1e1e1e;
        --text-primary: #e0e0e0;
        --text-secondary: #a0a0a0;
        --accent: #7986cb;
        --accent-light: rgba(121, 134, 203, 0.2);
        --accent-dark: #5c6bc0;
        --border-color: #333333;
        --card-bg: #1e1e1e;
        --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        --card-shadow-hover: rgba(0, 0, 0, 0.6);
        --dialog-bg: rgba(0, 0, 0, 0.9);
        --dialog-text: #ffffff;
        --scroll-thumb: #444444;
        --scroll-track: #1e1e1e;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: var(--scroll-track);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--scroll-thumb);
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent);
      }

      .app-container {
        font-family: 'Roboto', sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }

      header {
        padding-bottom: 10px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px; /* Space between navigation items */
      }

      main {
        min-height: 60dvh;
      }

      /* Theme toggle button styles */
      .theme-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary); /* Icons will inherit this color */
        transition: transform 300ms ease, background-color 300ms ease;
      }

      .theme-toggle:hover {
        transform: rotate(15deg);
        color: var(--accent);
      }

      .theme-toggle svg {
        transition: stroke 300ms ease;
      }

      h1 {
        font-weight: 300;
        color: var(--text-primary);
        margin: 0;
      }

      nav a {
        text-decoration: none;
        color: var(--text-secondary);
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 24px;
        transition: all 0.2s ease;
      }

      nav a:hover {
        color: var(--accent);
      }

      nav a.active {
        color: var(--accent);
        font-weight: 500;
        background-color: var(--accent-light);
      }

      footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
        text-align: center;
        color: var(--text-secondary);
      }
    `,
  ],
})
export class AppComponent {
  title = 'photography-portfolio';

  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
