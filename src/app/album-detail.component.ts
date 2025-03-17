import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './layout/base-layout.component';
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
    BaseLayoutComponent,
  ],
  template: `
    <app-base-layout *ngIf="album">
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
        <div class="photo-card add-photos-card" (click)="addPhotos()">
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
    </app-base-layout>
  `,
  styles: [
    `
      .album-header {
        margin-bottom: 30px;
      }

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
      }

      .back-button:hover {
        color: var(--accent);
      }

      h2 {
        margin: 0 0 15px 0;
        font-weight: 300;
        color: var(--text-primary);
      }

      .album-description {
        color: var(--text-secondary);
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

      .add-photos-card {
        border: 2px dashed var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;
        background: var(--bg-secondary);
        border-radius: 4px;
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
        color: var(--text-secondary);
      }

      .add-photos-card:hover .add-photos-content {
        color: var(--accent);
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
    private photoService: PhotoService,
    private router: Router
  ) { }

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

  addPhotos() {
    this.router.navigate(['/albums', this.album.id, 'add-photos']);
  }
}
