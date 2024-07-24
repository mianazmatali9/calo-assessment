import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  serverPort: process.env.PORT,
  frontEndDomain: process.env.FRONT_END_DOMAIN,
  environment: process.env.ENVIRONMENT,
  unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
};
