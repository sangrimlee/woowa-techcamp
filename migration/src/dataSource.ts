import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(
    process.cwd(),
    '..',
    'server',
    `.env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`
  ),
});

export function getConfig(): DataSourceOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [path.join(process.cwd(), '..', 'server', 'dist', '**/*.entity.js')],
  };
}

const datasource = new DataSource(getConfig());

export default datasource;
