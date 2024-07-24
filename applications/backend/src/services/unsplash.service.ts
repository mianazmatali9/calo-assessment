import axios from "axios";
import { UnsplashImage } from "../types/job.type";
import { ENV } from "../config/envs";

export const getRandomImageFunc = async (): Promise<UnsplashImage> => {
  const imageResponse = await axios.get<UnsplashImage>(`https://api.unsplash.com/photos/random`, {
    params: { client_id: ENV.unsplashAccessKey, query: 'food' },
  });

  return imageResponse.data;
};
