import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: mysql.Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connection = async (): Promise<mysql.PoolConnection> => {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.log('[DB POOL ERROR]', error);
    return error;
  }
};

export default connection;
