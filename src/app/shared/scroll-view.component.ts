import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scroll-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-view-container">
      <div class="photo-list">
        <div
          *ngFor="let photo of photos; let i = index"
          class="photo-item"
          [class.selected]="selectedIndex === i"
          (click)="selectPhoto(i)"
        >
          <img [src]="photo.url" [alt]="photo.title" loading="lazy" />
          <div class="overlay">
            <h3>{{ photo.title }}</h3>
            <p *ngIf="photo.description">{{ photo.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .scroll-view-container {
        height: 100%;
        overflow-y: auto;
        background-color: var(--bg-primary);
      }

      .photo-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
      }

      .photo-item {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        cursor: pointer;
        background-color: var(--card-bg);
      }

      .photo-item.selected {
        border: 2px solid var(--accent);
      }

      .photo-item img {
        width: 100%;
        max-height: 600px;
        object-fit: contain;
        background-color: black;
        transition: transform 200ms ease;
      }

      .photo-item:hover img {
        transform: scale(1.02);
      }

      .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        padding: 20px;
        opacity: 0;
        transition: opacity 300ms ease;
      }

      .photo-item:hover .overlay {
        opacity: 1;
      }

      .overlay h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: white;
      }

      .overlay p {
        margin: 0;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.4;
      }
    `,
  ],
})
export class ScrollViewComponent {
  @Input() photos: any[] = [];
  @Input() selectedIndex: number = -1;
  @Output() photoSelected = new EventEmitter<number>();

  selectPhoto(index: number) {
    this.selectedIndex = index;
    this.photoSelected.emit(index);
  }
}
