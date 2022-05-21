import 'dotenv/config';
import 'reflect-metadata';
import validateEnv from './utils/validateEnv';
import App from './app';
import { AppDataSource } from './data-source';
import PostController from './post/post.controller';

validateEnv();

(async () => {
    try {
      const connection = await AppDataSource.initialize();
      await connection.runMigrations();
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App(
      [
        new PostController(),
      ],
    );
    app.listen();
  })();