import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="upload-container" [class.multiple]="multiple">
      <div class="upload-area">
        <div
          class="dropzone"
          [class.active]="isDragging"
          [class.has-files]="files.length > 0"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave()"
          (drop)="onDrop($event)"
          (click)="fileInput.click()"
        >
          <input
            #fileInput
            type="file"
            [multiple]="multiple"
            accept="image/*"
            (change)="onFileSelected($event)"
            style="display: none"
          />

          <div class="upload-prompt" *ngIf="files.length === 0">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>Drag and drop images here or click to browse</p>
          </div>

          <div class="file-preview-grid" *ngIf="files.length > 0">
            <div
              *ngFor="let file of files; let i = index"
              class="file-preview"
              [class.selected]="selectedIndex === i"
              (click)="selectFile(i, $event)"
            >
              <img [src]="file.preview" [alt]="file.name" />
              <button class="remove-btn" (click)="removeFile(i, $event)">
                ×
              </button>
            </div>

            <div
              class="add-more"
              *ngIf="multiple"
              (click)="fileInput.click(); $event.stopPropagation()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            </div>
          </div>
        </div>
      </div>

      <div class="details-panel" *ngIf="selectedIndex !== -1 && detailsForm">
        <h3>Image Details</h3>
        <form [formGroup]="detailsForm">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              formControlName="title"
              placeholder="Enter image title"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              formControlName="description"
              rows="3"
              placeholder="Enter image description"
            ></textarea>
          </div>

          <div class="form-info">
            <p><strong>File name:</strong> {{ files[selectedIndex]?.name }}</p>
            <p>
              <strong>Size:</strong>
              {{ formatFileSize(files[selectedIndex]?.size) }}
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .upload-container {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }

      .upload-container.multiple .upload-area {
        flex: 2;
      }

      .upload-container.multiple .details-panel {
        flex: 1;
      }

      .upload-area {
        flex: 1;
      }

      .dropzone {
        border: 2px dashed var(--border-color);
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background: var(--bg-secondary);
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dropzone.active {
        border-color: var(--accent);
        background: var(--accent-light);
      }

      .dropzone.has-files {
        padding: 10px;
        align-items: flex-start;
      }

      .upload-prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-secondary);
      }

      .upload-prompt svg {
        margin-bottom: 10px;
        color: var(--text-secondary);
      }

      .file-preview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
        width: 100%;
      }

      .file-preview {
        position: relative;
        height: 100px;
        border-radius: 4px;
        overflow: hidden;
        border: 2px solid transparent;
        transition: all 0.2s ease;
      }

      .file-preview.selected {
        border-color: var(--accent);
      }

      .file-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .remove-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .file-preview:hover .remove-btn {
        opacity: 1;
      }

      .add-more {
        height: 100px;
        border: 1px dashed var(--border-color);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-secondary);
        transition: all 0.2s ease;
      }

      .add-more:hover {
        border-color: var(--accent);
        color: var(--accent);
      }

      .details-panel {
        background: var(--bg-secondary);
        border-radius: 8px;
        padding: 20px;
        min-width: 250px;
      }

      .details-panel h3 {
        margin-top: 0;
        margin-bottom: 15px;
        font-weight: 500;
        color: var(--text-primary);
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: var(--text-primary);
      }

      .form-group input,
      .form-group textarea {
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 14px;
        inline-size: -webkit-fill-available;
      }

      .form-group input:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: var(--accent);
      }

      .form-info {
        margin-top: 20px;
        font-size: 14px;
        color: var(--text-secondary);
      }

      .form-info p {
        margin: 5px 0;
      }
    `,
  ],
})
export class UploadPhotoComponent implements OnInit {
  @Input() multiple = false;
  @Input() maxFiles = 10;
  @Output() filesChanged = new EventEmitter<File[]>();
  @Output() metadataChanged = new EventEmitter<any[]>();

  files: any[] = [];
  isDragging = false;
  selectedIndex = -1;
  detailsForm: FormGroup | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.detailsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });

    // Update metadata when form changes
    this.detailsForm.valueChanges.subscribe((value) => {
      if (this.selectedIndex >= 0 && this.selectedIndex < this.files.length) {
        this.files[this.selectedIndex].metadata = value;
        this.metadataChanged.emit(this.files.map((f) => f.metadata));
      }
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(fileList: FileList) {
    // Convert FileList to array
    const newFiles = Array.from(fileList)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        file,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
        metadata: { title: '', description: '' },
      }));

    if (this.multiple) {
      // Add new files, respecting maxFiles limit
      this.files = [...this.files, ...newFiles].slice(0, this.maxFiles);
    } else {
      // Replace existing file
      this.files = [newFiles[0]];
    }

    // Select the first new file
    if (newFiles.length > 0) {
      this.selectFile(this.files.indexOf(newFiles[0]));
    }

    // Emit the actual File objects
    this.filesChanged.emit(this.files.map((f) => f.file));
  }

  selectFile(index: number, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    this.selectedIndex = index;

    // Update form with selected file's metadata
    if (this.detailsForm && index >= 0) {
      const metadata = this.files[index].metadata;
      this.detailsForm.patchValue({
        title: metadata.title || '',
        description: metadata.description || '',
      });
    }
  }

  removeFile(index: number, event: MouseEvent) {
    event.stopPropagation();

    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(this.files[index].preview);

    // Remove the file
    this.files.splice(index, 1);

    // Update selected index
    if (this.selectedIndex === index) {
      this.selectedIndex = this.files.length > 0 ? 0 : -1;
    } else if (this.selectedIndex > index) {
      this.selectedIndex--;
    }

    // If we still have a selected file, update the form
    if (this.selectedIndex >= 0 && this.detailsForm) {
      const metadata = this.files[this.selectedIndex].metadata;
      this.detailsForm.patchValue({
        title: metadata.title || '',
        description: metadata.description || '',
      });
    }

    // Emit the actual File objects
    this.filesChanged.emit(this.files.map((f) => f.file));
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
