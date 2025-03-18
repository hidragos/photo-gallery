import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="base-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .base-container {
        padding: 20px 0;
      }

      .header-section {
        margin-bottom: 30px;
      }

      .back-button-container {
        height: 24px; /* Maintain consistent height */
        margin-bottom: 15px;
      }

      .back-button-container.hidden {
        visibility: hidden;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: 300;
        color: var(--text-primary);
      }
    `,
  ],
})
export class BaseLayoutComponent {
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;
  @Input() backLabel: string = 'Back';
  @Input() backLink: string | any[] | null = null;
}
