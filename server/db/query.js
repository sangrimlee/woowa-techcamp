import pool from '.';

export default async function query(...args) {
  const connection = await pool.getConnection();
  const queryResult = await connection.query(...args);
  connection.release();
  return queryResult;
}
