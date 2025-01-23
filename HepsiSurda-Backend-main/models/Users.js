const pool = require("../config/database");

class User {
  async findAll() {
    const query = "SELECT * FROM users;";
    const { rows } = await pool.query(query);
    return rows;
  }
  async findOne(id) {
    const query = `SELECT * FROM users WHERE user_id = '${id}';`;
    const { rows } = await pool.query(query);
    return rows[0];
  }
  async findOneByEmail(email) {
    const query = `SELECT * FROM users WHERE email = '${email}';`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async create({ name, surname, email, telno, password }) {
    const query = `INSERT INTO users (name, surname, email, telno, password) VALUES ('${name}', '${surname}', '${email}', '${telno}', '${password}');`;

    try {
      const { rows } = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async update(id, { name, surname, email, telno }) {
    const query = `UPDATE users SET name = '${name}', surname = '${surname}', email = '${email}', telno = '${telno}' WHERE user_id = '${id}';`;
    const result = await pool.query(query);
    return result;
  }

  async resetPassword(id, newPassword) {
    const query = `
    UPDATE users 
    SET password = '${newPassword}' 
    WHERE user_id = '${id}'
    RETURNING *;`;

    try {
      const { rows } = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

module.exports = new User();
