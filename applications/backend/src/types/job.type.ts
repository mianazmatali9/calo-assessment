export interface UnsplashImage {
  id: string;
  slug: string;
  urls: string[];
}

export interface Job {
  id: string;
  status: 'pending' | 'resolved' | 'failed';
  result?: UnsplashImage;
}
