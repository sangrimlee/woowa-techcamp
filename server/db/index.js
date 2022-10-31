import mysql from 'mysql2/promise';
import config from '../config';
import init from './init';
import feed from './feed';

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
});

(async () => {
  await init(pool);
  await feed(pool);
})();

export default pool;
