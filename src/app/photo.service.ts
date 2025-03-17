import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  // Mock data
  private photos = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/700?random=${i + 1}`,
    title: `Photo ${i + 1}`,
    description: `Description for photo ${i + 1}`,
    albumId: Math.ceil((i + 1) / 10), // Assign photos to albums (1-5)
  }));

  private albums = [
    {
      id: 1,
      title: 'Nature',
      description: 'Beautiful landscapes and natural wonders',
      coverImage: 'https://picsum.photos/700?random=album1',
      photoCount: 10,
    },
    {
      id: 2,
      title: 'Urban',
      description: 'City life and architecture',
      coverImage: 'https://picsum.photos/700?random=album2',
      photoCount: 10,
    },
    {
      id: 3,
      title: 'Wildlife',
      description: 'Animals in their natural habitat',
      coverImage: 'https://picsum.photos/700?random=album3',
      photoCount: 10,
    },
    {
      id: 4,
      title: 'Abstract',
      description: 'Creative and experimental photography',
      coverImage: 'https://picsum.photos/700?random=album4',
      photoCount: 10,
    },
    {
      id: 5,
      title: 'Travel',
      description: 'Destinations from around the world',
      coverImage: 'https://picsum.photos/700?random=album5',
      photoCount: 10,
    },
  ];

  constructor() {}

  getAllPhotos(): Observable<any[]> {
    return of(this.photos);
  }

  getAlbums(): Observable<any[]> {
    return of(this.albums);
  }

  getAlbumById(id: number): Observable<any> {
    const album = this.albums.find((album) => album.id === +id);
    return of(album);
  }

  getPhotosByAlbumId(albumId: number): Observable<any[]> {
    const albumPhotos = this.photos.filter(
      (photo) => photo.albumId === +albumId
    );
    return of(albumPhotos);
  }

  getRandomImageUrl(): string {
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    return `https://picsum.photos/700?random=${uniqueId}`;
  }
}
