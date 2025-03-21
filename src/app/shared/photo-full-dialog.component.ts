import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-photo-full-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="dialog-overlay"
      (click)="onOverlayClick($event)"
      [class.fullscreen-mode]="isFullScreen"
      [class.scroll-mode]="isScrollMode"
    >
      <div class="dialog-content">
        <div class="dialog-controls">
          <!-- <button
            class="control-btn scroll-btn"
            (click)="toggleScrollMode()"
            title="{{ isScrollMode ? 'Exit scroll view' : 'Scroll view' }}"
          >
            <svg
              *ngIf="!isScrollMode"
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
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="18" x2="3" y2="18"></line>
            </svg>
            <svg
              *ngIf="isScrollMode"
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
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button> -->
          <button
            class="control-btn fullscreen-btn"
            (click)="toggleFullScreen()"
            title="{{ isFullScreen ? 'Exit full view' : 'Full view' }}"
          >
            <svg
              *ngIf="!isFullScreen"
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
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <svg
              *ngIf="isFullScreen"
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
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>
          <button
            class="control-btn close-btn"
            (click)="close.emit()"
            title="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <ng-container *ngIf="!isScrollMode">
          <div class="photo-container">
            <img [src]="photo.url" [alt]="photo.title" />
          </div>

          <div class="photo-info" *ngIf="!isFullScreen">
            <h2>{{ photo.title }}</h2>
            <p>{{ photo.description }}</p>
          </div>

          <div class="navigation">
            <button
              class="nav-btn prev"
              (click)="navigate.emit('prev')"
              title="Previous photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              class="nav-btn next"
              (click)="navigate.emit('next')"
              title="Next photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </ng-container>

        <ng-container *ngIf="isScrollMode">
          <div class="scroll-view">
            <div
              *ngFor="let p of allPhotos; let i = index"
              class="scroll-item"
              [class.active]="p.id === photo.id"
              [id]="'photo-' + p.id"
            >
              <img [src]="p.url" [alt]="p.title" loading="lazy" />
              <div class="scroll-item-info">
                <h2>{{ p.title }}</h2>
                <p>{{ p.description }}</p>
              </div>
            </div>
          </div>
        </ng-container>
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

      .fullscreen-mode {
        background-color: black;
      }

      .fullscreen-mode .dialog-content {
        width: 95dvw;
        height: 95dvh;
        max-width: none;
      }

      .fullscreen-mode img {
        height: 100%;
      }

      .scroll-mode .dialog-content {
        width: 95dvw;
        height: 95dvh;
        max-width: none;
        padding: 20px;
      }

      .dialog-content {
        position: relative;
        width: clamp(80%, 100vw, 100%);
        display: flex;
        flex-direction: column;
        max-width: 1400px;
        background-color: black;
        padding: 32px;
      }

      .photo-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      img {
        max-height: 95vh;
        max-width: 100%;
        object-fit: contain;
      }

      .photo-info {
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

      .dialog-controls {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 1001;
      }

      .control-btn {
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        transition: background 300ms ease;
      }

      .control-btn:hover {
        color: var(--accent);
      }

      .fullscreen-btn,
      .scroll-btn {
        font-size: 22px;
      }

      .close-btn {
        font-size: 30px;
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
        color: var(--accent);
      }

      /* Scroll view styles */
      .scroll-view {
        flex: 1;
        overflow-y: auto;
        max-height: calc(95vh - 80px);
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 20px 0;
      }

      .scroll-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        scroll-margin-top: 20px;
      }

      .scroll-item.active {
        border: 2px solid var(--accent);
      }

      .scroll-item img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
      }

      .scroll-item-info {
        width: 100%;
        padding: 20px;
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
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
export class PhotoFullDialogComponent implements OnInit, OnDestroy {
  @Input() photo: any;
  @Input() allPhotos: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<'prev' | 'next'>();

  isFullScreen = false;
  isScrollMode = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Disable scrolling on the HTML element when dialog opens
    document.documentElement.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    // Re-enable scrolling when dialog closes
    document.documentElement.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        if (this.isFullScreen) {
          this.toggleFullScreen();
        } else if (this.isScrollMode) {
          this.toggleScrollMode();
        } else {
          this.close.emit();
        }
        break;
      case 'ArrowLeft':
        if (!this.isScrollMode) {
          this.navigate.emit('prev');
        }
        break;
      case 'ArrowRight':
        if (!this.isScrollMode) {
          this.navigate.emit('next');
        }
        break;
      case 'f':
        this.toggleFullScreen();
        break;
      case 's':
        this.toggleScrollMode();
        break;
    }
  }

  onOverlayClick(event: MouseEvent) {
    // Close dialog only if clicking directly on the overlay (not on content)
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  toggleFullScreen() {
    if (this.isScrollMode) return; // Don't allow fullscreen in scroll mode
    this.isFullScreen = !this.isFullScreen;
  }

  toggleScrollMode() {
    this.isScrollMode = !this.isScrollMode;

    if (this.isScrollMode) {
      this.isFullScreen = false; // Exit fullscreen if entering scroll mode

      // Wait for DOM to update, then scroll to the current photo
      setTimeout(() => {
        const element = document.getElementById(`photo-${this.photo.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  onFullScreenChange() {
    this.isFullScreen = !!document.fullscreenElement;
  }
}
