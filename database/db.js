const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  async query(text, params) {
    return pool.query(text, params);
  },

  async getAllMessages() {
    const res = await pool.query("SELECT * FROM messages ORDER BY added DESC");
    return res.rows;
  },

  async getMessageById(id) {
    const res = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return res.rows[0];
  },

  async createMessage(user, text) {
    const res = await pool.query(
      "INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *",
      [user, text]
    );
    return res.rows[0];
  },
};
