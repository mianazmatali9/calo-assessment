import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CorsOptions } from 'cors';
import express from 'express';
import { Server } from 'http';
import logger from 'morgan';

import { ENV } from './config/envs';
import { router } from './routes';

const whitelist: string[] = ['http://localhost:3000', ENV.frontEndDomain!];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', cors(corsOptions), router);

let server: Server;

const startServer = (): Server => {
  const port = ENV.serverPort || 3001;

  try {
    server = app.listen(port, () => {
      console.log(`API server running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Couldn't connect to database");
  }

  return server;
};

export { startServer };
