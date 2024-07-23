import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  serverPort: process.env.PORT,
  frontEndDomain: process.env.FRONTEND_APP_URL,
};
