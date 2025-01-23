const pool = require("../config/database");

class Contact {
  async create({ user_id, text, title }) {
    const query = `INSERT INTO contacts (user_id, text, title) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [user_id, text, title];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM contacts;";
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error finding contacts:", error);
      throw error;
    }
  }

  async findOne(id) {
    const query = `SELECT * FROM contacts WHERE contact_id = $1;`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding contact:", error);
      throw error;
    }
  }

  async update(id, { user_id, text, title }) {
    const query = `UPDATE contacts SET user_id = $1, text = $2, title = $3 WHERE contact_id = $4 RETURNING *;`;
    const values = [user_id, text, title, id];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }

  async delete(id) {
    const query = `DELETE FROM contacts WHERE contact_id = $1;`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0]; // Note: This will return undefined since DELETE doesn't return rows
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }

  async findByUserId(userId) {
    const query = `SELECT * FROM contacts WHERE user_id = $1;`;
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error("Error finding contacts by user ID:", error);
      throw error;
    }
  }
}

module.exports = new Contact();
