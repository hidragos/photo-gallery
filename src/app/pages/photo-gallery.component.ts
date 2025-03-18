import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

import { BaseLayoutComponent } from '../layout/base-layout.component';
import { PhotoService } from '../services/photo.service';
import { GalleryComponent } from '../shared/gallery.component';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, BaseLayoutComponent, GalleryComponent],
  template: `
    <app-base-layout title="Gallery">
      <app-gallery [photos]="displayedPhotos"></app-gallery>
    </app-base-layout>
  `,
})
export class PhotoGalleryComponent implements OnInit {
  photos: any[] = [];
  displayedPhotos: any[] = [];
  page = 1;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadInitialPhotos();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
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
    this.photoService.getAllPhotos().subscribe((photos) => {
      this.photos = photos;
      this.displayedPhotos = this.photos.slice(0, 10);
    });
  }

  loadMorePhotos() {
    const nextBatch = this.photos.slice(
      this.displayedPhotos.length,
      this.displayedPhotos.length + 10
    );

    if (nextBatch.length > 0) {
      this.displayedPhotos = [...this.displayedPhotos, ...nextBatch];
      this.page++;
    }
  }
}
