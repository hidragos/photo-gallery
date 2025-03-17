import { Routes } from '@angular/router';

import { AddPhotosComponent } from './add-photos.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumsComponent } from './albums.component';
import { NewAlbumComponent } from './new-album.component';
import { PhotoGalleryComponent } from './photo-gallery.component';

export const routes: Routes = [
    { path: '', component: PhotoGalleryComponent },
    { path: 'albums', component: AlbumsComponent },
    { path: 'albums/new', component: NewAlbumComponent },
    { path: 'albums/:id', component: AlbumDetailComponent },
    { path: 'albums/:id/add-photos', component: AddPhotosComponent },
    { path: '**', redirectTo: '' }
];
