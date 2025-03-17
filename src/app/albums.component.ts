import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './layout/base-layout.component';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseLayoutComponent],
  template: `
    <app-base-layout title="Photo Albums">
      <div class="albums-grid">
        <div
          class="album-card"
          *ngFor="let album of albums"
          [routerLink]="['/albums', album.id]"
        >
          <div class="album-cover">
            <img [src]="album.coverImage" [alt]="album.title" loading="lazy" />
          </div>
          <div class="album-info">
            <h3>{{ album.title }}</h3>
            <p>{{ album.description }}</p>
            <span class="photo-count">{{ album.photoCount }} photos</span>
          </div>
        </div>

        <!-- New Album Card -->
        <div class="album-card new-album-card" (click)="createNewAlbum()">
          <div class="new-album-content">
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
            <span>Create New Album</span>
          </div>
        </div>
      </div>
    </app-base-layout>
  `,
  styles: [
    `
      .albums-container {
        padding: 20px 0;
      }

      .albums-container h2 {
        margin-bottom: 30px;
        font-weight: 300;
        color: var(--text-primary); /* Update this to use the theme variable */
      }

      .albums-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        grid-gap: 30px;
      }

      .album-card {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        transition: transform 300ms ease, box-shadow 300ms ease;
        cursor: pointer;
        background-color: var(
          --card-bg
        ); /* Use theme variable instead of white */
      }

      .album-card:not(.new-album-card):hover {
        transform: translateY(-16px);
        box-shadow: 0 8px 20px var(--card-shadow-hover, rgba(0, 0, 0, 0.15));
      }

      .album-card:not(.new-album-card):hover .album-cover img {
        transform: scale(1.05);
      }

      .album-card:not(.new-album-card):hover .album-info h3 {
        text-decoration: underline;
      }

      .album-cover {
        height: 180px;
        overflow: hidden;
      }

      .album-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .album-info {
        padding: 15px;
      }

      .album-info h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: var(--text-primary); /* Use theme variable */
      }

      .album-info p {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: var(--text-secondary); /* Use theme variable */
        line-height: 1.4;
      }

      .photo-count {
        display: inline-block;
        font-size: 12px;
        color: var(--text-secondary); /* Use theme variable */
        background-color: var(--bg-secondary); /* Use theme variable */
        padding: 4px 8px;
        border-radius: 12px;
      }

      .loader {
        text-align: center;
        padding: 30px;
        font-style: italic;
        color: #777;
      }

      .new-album-card {
        border: 2px dashed var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        background: var(--bg-secondary);
        transition: all 0.3s ease;
      }

      .new-album-card:hover {
        border-color: var(--accent);
        color: var(--accent);
        background: var(--bg-primary);
      }

      .new-album-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        color: var(--text-secondary);
      }

      .new-album-card:hover .new-album-content {
        color: var(--accent);
      }
    `,
  ],
})
export class AlbumsComponent implements OnInit {
  albums: any[] = [];

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.photoService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }

  createNewAlbum() {
    this.router.navigate(['/albums/new']);
  }
}
