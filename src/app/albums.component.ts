import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhotoService } from './photo.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="albums-container">
      <h2>Photo Albums</h2>

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
      </div>

      <div *ngIf="loading" class="loader">Loading albums...</div>
    </div>
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

      .album-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px var(--card-shadow-hover, rgba(0, 0, 0, 0.15));
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

      .album-card:hover .album-cover img {
        transform: scale(1.05);
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
    `,
  ],
})
export class AlbumsComponent implements OnInit {
  albums: any[] = [];
  loading = false;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loading = true;
    this.photoService.getAlbums().subscribe((albums) => {
      this.albums = albums;
      this.loading = false;
    });
  }
}
