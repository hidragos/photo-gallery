import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseLayoutComponent } from '../layout/base-layout.component';
import { PhotoService } from '../services/photo.service';
import { GalleryComponent } from '../shared/gallery.component';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, BaseLayoutComponent, GalleryComponent],
  template: `
    <app-base-layout
      [title]="album?.title"
      [showBackButton]="true"
      backLabel="Albums"
      backLink="/albums"
    >
      <ng-container *ngIf="album">
        <p class="album-description">{{ album.description }}</p>
        <app-gallery
          [photos]="albumPhotos"
          [showAddButton]="true"
          (addPhotos)="addPhotos()"
        ></app-gallery>
      </ng-container>
    </app-base-layout>
  `,
  styles: [
    `
      .album-description {
        color: var(--text-secondary);
        font-size: 16px;
        line-height: 1.5;
        max-width: 800px;
        margin-bottom: 30px;
      }
    `,
  ],
})
export class AlbumDetailComponent implements OnInit {
  album: any;
  albumPhotos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const albumId = params['id'];
      this.photoService.getAlbumById(albumId).subscribe((album) => {
        this.album = album;
        this.photoService.getPhotosByAlbumId(albumId).subscribe((photos) => {
          this.albumPhotos = photos;
        });
      });
    });
  }

  addPhotos() {
    this.router.navigate(['/albums', this.album.id, 'add-photos']);
  }
}
