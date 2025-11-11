import pg from 'pg';

const {
  PGHOST = 'localhost',
  PGPORT = 5432,
  PGUSER = 'postgres',
  PGPASSWORD = 'postgres',
  PGDATABASE = 'siteweb',
} = process.env;

export const pool = new pg.Pool({
  host: PGHOST,
  port: Number(PGPORT),
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
});