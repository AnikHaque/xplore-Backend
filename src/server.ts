/* eslint-disable @typescript-eslint/no-var-requires */
import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import config from './config/index';
// import { console, logger } from './shared/logger';
import { v2 as cloudinary } from 'cloudinary';
// require('dotenv').config();
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
  maxFileSize: 10000000,
});

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('DB Connected on Successfully');
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main().catch(err => console.error(err));

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
