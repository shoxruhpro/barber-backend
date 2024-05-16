import { config } from 'dotenv';
config();

export const configs = {
  SECRET: process.env.SECRET,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME,
  DB_PASS: process.env.DB_PASS,
};
