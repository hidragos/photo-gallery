import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

import { PhotoFullDialogComponent } from './photo-full-dialog.component';
import { PhotoGalleryCardComponent } from './photo-gallery-card.component';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, PhotoGalleryCardComponent, PhotoFullDialogComponent],
  template: `
    <div class="gallery-container">
      <h2>Gallery</h2>

      <div class="gallery">
        <app-photo-gallery-card
          *ngFor="let photo of displayedPhotos"
          [photo]="photo"
          (click)="openPhotoDialog(photo)"
        ></app-photo-gallery-card>
      </div>

      <app-photo-full-dialog
        *ngIf="selectedPhoto"
        [photo]="selectedPhoto"
        [allPhotos]="photos"
        (close)="closePhotoDialog()"
        (navigate)="navigatePhoto($event)"
      ></app-photo-full-dialog>

      <div *ngIf="loading" class="loader">Loading...</div>
    </div>
  `,
  styles: [
    `
      .gallery-container {
        padding: 20px 0;
      }

      .gallery-container h2 {
        margin-bottom: 30px;
        font-weight: 300;
        color: var(--text-primary); /* Update this to use the theme variable */
      }

      .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        grid-auto-flow: dense;
      }

      .loader {
        text-align: center;
        padding: 30px;
        font-style: italic;
        color: #777;
      }
    `,
  ],
})
export class PhotoGalleryComponent implements OnInit {
  photos: any[] = [];
  displayedPhotos: any[] = [];
  selectedPhoto: any | null = null;
  loading = false;
  page = 1;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadInitialPhotos();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.loading || this.selectedPhoto) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 500) {
      this.loadMorePhotos();
    }
  }

  loadInitialPhotos() {
    this.loading = true;
    this.photoService.getAllPhotos().subscribe((photos) => {
      this.photos = photos;
      this.displayedPhotos = this.photos.slice(0, 10);
      this.loading = false;
    });
  }

  loadMorePhotos() {
    if (this.loading) return;

    this.loading = true;
    setTimeout(() => {
      const nextBatch = this.photos.slice(
        this.displayedPhotos.length,
        this.displayedPhotos.length + 10
      );

      if (nextBatch.length > 0) {
        this.displayedPhotos = [...this.displayedPhotos, ...nextBatch];
        this.page++;
      }

      this.loading = false;
    }, 600);
  }

  openPhotoDialog(photo: any) {
    this.selectedPhoto = photo;
    document.body.style.overflow = 'hidden';
  }

  closePhotoDialog() {
    this.selectedPhoto = null;
    document.body.style.overflow = 'auto';
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

    if (newIndex >= this.displayedPhotos.length - 3) {
      this.loadMorePhotos();
    }
  }
}
