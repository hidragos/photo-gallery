import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseLayoutComponent } from '../layout/base-layout.component';
import { PhotoService } from '../services/photo.service';
import { UploadPhotoComponent } from '../shared/upload-photo.component';

@Component({
  selector: 'app-add-photos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseLayoutComponent,
    UploadPhotoComponent,
  ],
  template: `
    <app-base-layout
      *ngIf="album"
      [showBackButton]="true"
      [backLink]="['/albums', albumId]"
      [backLabel]="album ? album.title : 'Back'"
    >
      <div class="form-container">
        <app-upload-photo
          [multiple]="true"
          [maxFiles]="20"
          (filesChanged)="onFilesChanged($event)"
          (metadataChanged)="onMetadataChanged($event)"
        ></app-upload-photo>

        <div class="error-message" *ngIf="submitted && photoFiles.length === 0">
          <span>Please add at least one photo</span>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="cancel()">
            Cancel
          </button>
          <button type="button" class="btn-primary" (click)="onSubmit()">
            Add Photos
          </button>
        </div>
      </div>
    </app-base-layout>
  `,
  styles: [
    `
      .form-container {
        max-width: 1000px;
        margin: 0 auto;
        background: var(--card-bg);
        padding: 30px;
        border-radius: 8px;
        box-shadow: var(--card-shadow);
      }

      .error-message {
        color: #e53935;
        font-size: 14px;
        margin: 10px 0;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 30px;
      }

      button {
        padding: 12px 24px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .btn-primary {
        background-color: var(--accent);
        color: white;
      }

      .btn-primary:hover {
        background-color: var(--accent-dark, #0056b3);
      }

      .btn-secondary {
        background-color: var(--bg-secondary);
        color: var(--text-secondary);
      }

      .btn-secondary:hover {
        background-color: var(--border-color);
      }
    `,
  ],
})
export class AddPhotosComponent implements OnInit {
  album: any;
  albumId: number = 0;
  submitted = false;
  photoFiles: File[] = [];
  photoMetadata: any[] = [];

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.albumId = +params['id'];
      this.photoService.getAlbumById(this.albumId).subscribe((album) => {
        this.album = album;
      });
    });
  }

  onFilesChanged(files: File[]) {
    this.photoFiles = files;
  }

  onMetadataChanged(metadata: any[]) {
    this.photoMetadata = metadata;
  }

  onSubmit() {
    this.submitted = true;

    if (this.photoFiles.length === 0) {
      return;
    }

    // TODO: Implement actual photo addition with PhotoService
    console.log('Photos to upload:', this.photoFiles);
    console.log('Photo metadata:', this.photoMetadata);

    // Navigate back to album detail page
    this.router.navigate(['/albums', this.albumId]);
  }

  cancel() {
    this.router.navigate(['/albums', this.albumId]);
  }
}
