import pg from 'pg'

// One shared connection pool. DATABASE_URL comes from server/.env (see .env.example).
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})
