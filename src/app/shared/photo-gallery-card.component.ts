import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-gallery-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photo-card">
      <img [src]="photo.url" [alt]="photo.title" loading="lazy" />
      <div class="overlay"></div>
    </div>
  `,
  styles: [
    `
      .photo-card {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        background-color: var(--bg-secondary);
        height: 300px;
        transition: transform 300ms ease;
        box-shadow: var(--card-shadow);
      }

      /* Other styles */

      .photo-card.wide {
        grid-column: span 2;
      }

      .photo-card.tall {
        grid-row: span 2;
        height: 620px;
      }

      .photo-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.4);
        height: 100%;
        opacity: 0;
        transition: opacity 300ms ease;
      }

      .photo-card:hover .overlay {
        opacity: 1;
      }

      h3 {
        color: white;
        margin: 0;
        font-weight: 400;
        font-size: 18px;
      }
    `,
  ],
})
export class PhotoGalleryCardComponent {
  @Input() photo: any;

  // Randomly make some photos wide or tall for visual interest
  isTall() {
    return this.photo.id % 5 === 0;
  }

  isWide() {
    return this.photo.id % 4 === 0;
  }
}
