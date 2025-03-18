import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PhotoFullDialogComponent } from './photo-full-dialog.component';
import { PhotoGalleryCardComponent } from './photo-gallery-card.component';
import { ScrollViewComponent } from './scroll-view.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    PhotoGalleryCardComponent,
    PhotoFullDialogComponent,
    ScrollViewComponent,
  ],
  template: `
    <!-- <div class="gallery-controls">
      <div class="view-toggle">
        <button
          class="toggle-btn"
          [class.active]="viewMode === 'grid'"
          (click)="viewMode = 'grid'"
          title="Grid view"
        >
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
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button
          class="toggle-btn"
          [class.active]="viewMode === 'scroll'"
          (click)="viewMode = 'scroll'"
          title="Scroll view"
        >
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
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="18" x2="3" y2="18"></line>
          </svg>
        </button>
      </div>
    </div> -->

    <ng-container *ngIf="viewMode === 'grid'">
      <div class="gallery">
        <ng-container *ngIf="showAddButton">
          <div class="photo-card add-photos-card" (click)="addPhotos.emit()">
            <div class="add-photos-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add Photos</span>
            </div>
          </div>
        </ng-container>

        <app-photo-gallery-card
          *ngFor="let photo of photos"
          [photo]="photo"
          (click)="openPhotoDialog(photo)"
        ></app-photo-gallery-card>
      </div>
    </ng-container>

    <ng-container *ngIf="viewMode === 'scroll'">
      <app-scroll-view
        [photos]="photos"
        [selectedIndex]="selectedPhotoIndex"
        (photoSelected)="openPhotoDialogByIndex($event)"
      ></app-scroll-view>
    </ng-container>

    <app-photo-full-dialog
      *ngIf="selectedPhoto"
      [photo]="selectedPhoto"
      [allPhotos]="photos"
      (close)="closePhotoDialog()"
      (navigate)="navigatePhoto($event)"
    ></app-photo-full-dialog>
  `,
  styles: [
    `
      .gallery-controls {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
      }

      .view-toggle {
        display: flex;
        background-color: var(--bg-secondary);
        border-radius: 8px;
        overflow: hidden;
      }

      .toggle-btn {
        background: none;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .toggle-btn.active {
        background-color: var(--accent);
        color: white;
      }

      .toggle-btn:hover:not(.active) {
        background-color: var(--border-color);
      }

      .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2px;
        grid-auto-flow: dense;
      }

      .add-photos-card {
        border: 2px dashed var(--border-color);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-secondary);
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .add-photos-card:hover {
        border-color: var(--accent);
        background: var(--bg-primary);
      }

      .add-photos-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        color: var(--text-icon);
      }

      .add-photos-card:hover .add-photos-content {
        color: var(--accent);
      }
    `,
  ],
})
export class GalleryComponent {
  @Input() photos: any[] = [];
  @Input() showAddButton = false;
  @Output() addPhotos = new EventEmitter<void>();

  viewMode: 'grid' | 'scroll' = 'grid';
  selectedPhoto: any | null = null;
  selectedPhotoIndex: number = -1;

  openPhotoDialog(photo: any) {
    this.selectedPhoto = photo;
    this.selectedPhotoIndex = this.photos.findIndex((p) => p.id === photo.id);
  }

  openPhotoDialogByIndex(index: number) {
    this.selectedPhotoIndex = index;
    this.selectedPhoto = this.photos[index];
  }

  closePhotoDialog() {
    this.selectedPhoto = null;
    this.selectedPhotoIndex = -1;
  }

  navigatePhoto(direction: 'prev' | 'next') {
    if (!this.selectedPhoto) return;

    const currentIndex = this.photos.findIndex(
      (p) => p.id === this.selectedPhoto!.id
    );
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : this.photos.length - 1;
    } else {
      newIndex = currentIndex < this.photos.length - 1 ? currentIndex + 1 : 0;
    }

    this.selectedPhoto = this.photos[newIndex];
    this.selectedPhotoIndex = newIndex;
  }
}
