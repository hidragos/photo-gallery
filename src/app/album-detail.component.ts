import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { PhotoFullDialogComponent } from './photo-full-dialog.component';
import { PhotoGalleryCardComponent } from './photo-gallery-card.component';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PhotoGalleryCardComponent,
    PhotoFullDialogComponent,
  ],
  template: `
    <div class="album-detail-container" *ngIf="album">
      <div class="album-header">
        <button class="back-button" routerLink="/albums">
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
          <span>Albums</span>
        </button>
        <h2>{{ album.title }}</h2>
        <p class="album-description">{{ album.description }}</p>
      </div>

      <div class="gallery">
        <app-photo-gallery-card
          *ngFor="let photo of albumPhotos"
          [photo]="photo"
          (click)="openPhotoDialog(photo)"
        ></app-photo-gallery-card>
      </div>

      <app-photo-full-dialog
        *ngIf="selectedPhoto"
        [photo]="selectedPhoto"
        [allPhotos]="albumPhotos"
        (close)="closePhotoDialog()"
        (navigate)="navigatePhoto($event)"
      ></app-photo-full-dialog>

      <div *ngIf="loading" class="loader">Loading album photos...</div>
    </div>
  `,
  styles: [
    `
      .album-detail-container {
        padding: 20px 0;
      }

      .album-header {
        margin-bottom: 30px;
      }

      .back-button {
        background: none;
        border: none;
        font-size: 14px;
        color: var(--text-secondary); /* Update to use theme variable */
        padding: 5px 0;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        margin-bottom: 15px;
      }

      .back-button:hover {
        color: var(--accent); /* Update to use theme variable */
      }

      h2 {
        margin: 0 0 15px 0;
        font-weight: 300;
        color: var(--text-primary); /* Update to use theme variable */
      }

      .album-description {
        color: var(--text-secondary); /* Update to use theme variable */
        font-size: 16px;
        line-height: 1.5;
        max-width: 800px;
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
export class AlbumDetailComponent implements OnInit {
  album: any;
  albumPhotos: any[] = [];
  selectedPhoto: any | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const albumId = params['id'];
      this.photoService.getAlbumById(albumId).subscribe((album) => {
        this.album = album;

        this.photoService.getPhotosByAlbumId(albumId).subscribe((photos) => {
          this.albumPhotos = photos;
          this.loading = false;
        });
      });
    });
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

    const currentIndex = this.albumPhotos.findIndex(
      (p) => p.id === this.selectedPhoto!.id
    );
    let newIndex: number;

    if (direction === 'prev') {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : this.albumPhotos.length - 1;
    } else {
      newIndex =
        currentIndex < this.albumPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    this.selectedPhoto = this.albumPhotos[newIndex];
  }
}
