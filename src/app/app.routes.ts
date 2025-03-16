import { Routes } from '@angular/router';

import { AlbumDetailComponent } from './album-detail.component';
import { AlbumsComponent } from './albums.component';
import { PhotoGalleryComponent } from './photo-gallery.component';

export const routes: Routes = [
    { path: '', component: PhotoGalleryComponent },
    { path: 'albums', component: AlbumsComponent },
    { path: 'albums/:id', component: AlbumDetailComponent },
    { path: '**', redirectTo: '' }
];
