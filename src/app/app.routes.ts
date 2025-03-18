import { Routes } from '@angular/router';

import { AddPhotosComponent } from './pages/add-photos.component';
import { AlbumDetailComponent } from './pages/album-detail.component';
import { AlbumsComponent } from './pages/albums.component';
import { NewAlbumComponent } from './pages/new-album.component';
import { PhotoGalleryComponent } from './pages/photo-gallery.component';

export const routes: Routes = [
  { path: '', component: PhotoGalleryComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/new', component: NewAlbumComponent },
  { path: 'albums/:id', component: AlbumDetailComponent },
  { path: 'albums/:id/add-photos', component: AddPhotosComponent },
  { path: '**', redirectTo: '' },
];
