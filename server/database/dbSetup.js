import pg from "pg";
import dotenv from "dotenv";
import setupTables from "./dbqueries";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});
pool.connect((err, client, done) => {
  if (err) {
    return `Can not connect to database due to ${err}`;
  }

  client.query((text, params, callback) => {
    done();
    return pool.query(text, params, (error, res) => {
      callback(error, res);
    });
  });
  return "success";
});

export default pool;
