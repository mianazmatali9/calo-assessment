interface Urls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

export interface UnsplashImage {
  id: string;
  slug: string;
  urls: Urls;
}

export interface Job {
  id: string;
  status: 'pending' | 'resolved' | 'failed';
  result?: UnsplashImage;
}
