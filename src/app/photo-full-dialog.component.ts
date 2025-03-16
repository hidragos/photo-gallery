import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-photo-full-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" (click)="onOverlayClick($event)">
      <div class="dialog-content">
        <button class="close-btn" (click)="close.emit()">×</button>

        <div class="photo-container">
          <img [src]="photo.url" [alt]="photo.title" />
        </div>

        <div class="photo-info">
          <h2>{{ photo.title }}</h2>
          <p>{{ photo.description }}</p>
        </div>

        <div class="navigation">
          <button class="nav-btn prev" (click)="navigate.emit('prev')">
            &lt;
          </button>
          <button class="nav-btn next" (click)="navigate.emit('next')">
            &gt;
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--dialog-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fade-in 300ms ease;
      }

      .dialog-content {
        position: relative;
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        max-width: 1400px;
      }

      .photo-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      img {
        max-height: 80vh;
        max-width: 100%;
        object-fit: contain;
      }

      .photo-info {
        padding: 20px;
        color: var(--dialog-text);
      }

      h2 {
        margin: 0;
        font-weight: 300;
        font-size: 24px;
      }

      p {
        margin: 10px 0 0;
        opacity: 0.8;
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 1001;
      }

      .navigation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
      }

      .nav-btn {
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        font-size: 24px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 300ms ease;
      }

      .nav-btn:hover {
        background: rgba(0, 0, 0, 0.8);
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class PhotoFullDialogComponent {
  @Input() photo: any;
  @Input() allPhotos: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<'prev' | 'next'>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.close.emit();
        break;
      case 'ArrowLeft':
        this.navigate.emit('prev');
        break;
      case 'ArrowRight':
        this.navigate.emit('next');
        break;
    }
  }

  onOverlayClick(event: MouseEvent) {
    // Close dialog only if clicking directly on the overlay (not on content)
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
