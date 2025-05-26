const pool = require("../db");

async function getAllMessages() {
  const result = await pool.query("SELECT * FROM messages ORDER BY added DESC");
  return result.rows;
}

async function getMessageById(id) {
  const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  return result.rows[0];
}

async function addMessage(user, text) {
  await pool.query("INSERT INTO messages (user_name, text) VALUES ($1, $2)", [
    user,
    text,
  ]);
}

module.exports = {
  getAllMessages,
  getMessageById,
  addMessage,
};
