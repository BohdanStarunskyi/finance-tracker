import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();
export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/shared/entities/**/*.{ts,js}'],
  migrations: ['dist/migrations/**/*.{ts,js}'],
  ssl: process.env.ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const dataSource: DataSource = new DataSource(dbConfig);
export default dataSource;