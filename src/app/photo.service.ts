import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    // Mock data
    private photos = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        url: `https://source.unsplash.com/random/800x600?sig=${i}`,
        title: `Photo ${i + 1}`,
        description: `Description for photo ${i + 1}`,
        albumId: Math.ceil((i + 1) / 10) // Assign photos to albums (1-5)
    }));

    private albums = [
        {
            id: 1,
            title: 'Nature',
            description: 'Beautiful landscapes and natural wonders',
            coverImage: 'https://source.unsplash.com/random/800x600?nature',
            photoCount: 10
        },
        {
            id: 2,
            title: 'Urban',
            description: 'City life and architecture',
            coverImage: 'https://source.unsplash.com/random/800x600?urban',
            photoCount: 10
        },
        {
            id: 3,
            title: 'Wildlife',
            description: 'Animals in their natural habitat',
            coverImage: 'https://source.unsplash.com/random/800x600?wildlife',
            photoCount: 10
        },
        {
            id: 4,
            title: 'Abstract',
            description: 'Creative and experimental photography',
            coverImage: 'https://source.unsplash.com/random/800x600?abstract',
            photoCount: 10
        },
        {
            id: 5,
            title: 'Travel',
            description: 'Destinations from around the world',
            coverImage: 'https://source.unsplash.com/random/800x600?travel',
            photoCount: 10
        }
    ];

    constructor() { }

    getAllPhotos(): Observable<any[]> {
        // Simulate API delay
        return of(this.photos).pipe(delay(800));
    }

    getAlbums(): Observable<any[]> {
        return of(this.albums).pipe(delay(800));
    }

    getAlbumById(id: number): Observable<any> {
        const album = this.albums.find(album => album.id === +id);
        return of(album).pipe(delay(400));
    }

    getPhotosByAlbumId(albumId: number): Observable<any[]> {
        const albumPhotos = this.photos.filter(photo => photo.albumId === +albumId);
        return of(albumPhotos).pipe(delay(800));
    }
}
