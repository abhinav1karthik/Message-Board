const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const res = await pool.query("SELECT COUNT(*) FROM messages");

    if (parseInt(res.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO messages (username, text, added)
        VALUES 
          ('Admin', 'Welcome to the message board!', NOW()),
          ('User1', 'This is a test message', NOW());
      `);
    }

    console.log("Database setup complete");
  } catch (err) {
    console.error("Error setting up database:", err.message);
    console.error("Full error object:", err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
