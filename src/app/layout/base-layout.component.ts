import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-base-layout',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="base-container">
      <h2 *ngIf="title">{{ title }}</h2>
      <ng-content></ng-content>
    </div>
  `,
    styles: [
        `
      .base-container {
        padding: 20px 0;
      }

      h2 {
        margin-bottom: 30px;
        font-weight: 300;
        color: var(--text-primary);
      }
    `,
    ],
})
export class BaseLayoutComponent {
    @Input() title: string = '';
} 