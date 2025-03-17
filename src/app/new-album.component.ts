import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseLayoutComponent } from './layout/base-layout.component';
import { PhotoService } from './photo.service';
import { UploadPhotoComponent } from './upload-photo.component';

@Component({
  selector: 'app-new-album',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseLayoutComponent,
    UploadPhotoComponent,
  ],
  template: `
    <app-base-layout title="Create New Album">
      <div class="form-container">
        <form [formGroup]="albumForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Album Title</label>
            <input
              type="text"
              id="title"
              formControlName="title"
              placeholder="Enter album title"
            />
            <div class="error-message" *ngIf="submitted && f['title'].errors">
              <span *ngIf="f['title'].errors?.['required']"
                >Title is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              formControlName="description"
              placeholder="Enter album description"
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Cover Image</label>
            <app-upload-photo
              [multiple]="false"
              (filesChanged)="onCoverImageSelected($event)"
            ></app-upload-photo>
            <div class="error-message" *ngIf="submitted && !coverImageFile">
              <span>Cover image is required</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="cancel()">
              Cancel
            </button>
            <button type="submit" class="btn-primary">Create Album</button>
          </div>
        </form>
      </div>
    </app-base-layout>
  `,
  styles: [
    `
      .form-container {
        max-width: 600px;
        margin: 0 auto;
        background: var(--card-bg);
        padding: 30px;
        border-radius: 8px;
        box-shadow: var(--card-shadow);
      }

      .form-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text-primary);
      }

      input,
      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 16px;
      }

      input:focus,
      textarea:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 2px var(--accent-light);
      }

      .error-message {
        color: #e53935;
        font-size: 14px;
        margin-top: 5px;
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

      .preview {
        margin-top: 20px;
      }

      .preview h3 {
        margin-bottom: 10px;
        font-weight: 400;
        color: var(--text-primary);
      }

      .cover-preview {
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-radius: 4px;
        border: 1px solid var(--border-color);
      }

      .cover-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
})
export class NewAlbumComponent {
  albumForm: FormGroup;
  submitted = false;
  coverImageFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.albumForm.controls;
  }

  onCoverImageSelected(files: File[]) {
    this.coverImageFile = files.length > 0 ? files[0] : null;
  }

  onSubmit() {
    this.submitted = true;

    if (this.albumForm.invalid || !this.coverImageFile) {
      return;
    }

    // TODO: Implement actual album creation with PhotoService
    console.log('Album form submitted:', {
      ...this.albumForm.value,
      coverImage: this.coverImageFile,
    });

    // Navigate back to albums page
    this.router.navigate(['/albums']);
  }

  cancel() {
    this.router.navigate(['/albums']);
  }
}
