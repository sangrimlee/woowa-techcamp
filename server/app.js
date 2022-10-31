import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpackMiddleware from './middlewares/webpack.middleware';
import config from './config';
import apiRouter from './routers/api.router';

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

if (config.IS_PRODUCTION) {
  app.use(express.static(path.resolve(__dirname, '..', 'dist')));
  app.use('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
} else {
  app.use(webpackMiddleware);
}

export default app;
