import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      class="back-button"
      [routerLink]="routerLink"
      *ngIf="routerLink; else jsBackButton"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
        <line x1="19" y1="12" x2="9" y2="12" />
      </svg>
      <span>{{ label }}</span>
    </button>

    <ng-template #jsBackButton>
      <button class="back-button" (click)="goBack()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
          <line x1="19" y1="12" x2="9" y2="12" />
        </svg>
        <span>{{ label }}</span>
      </button>
    </ng-template>
  `,
  styles: [
    `
      .back-button {
        background: none;
        border: none;
        font-size: 14px;
        color: var(--text-secondary);
        padding: 5px 0;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        margin-bottom: 15px;
        transition: color 0.2s ease;
      }

      .back-button:hover {
        color: var(--accent);
      }

      .back-button svg {
        margin-right: 5px;
      }
    `,
  ],
})
export class BackButtonComponent {
  @Input() label: string = 'Back';
  @Input() routerLink: string | any[] | null = null;

  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }
}
