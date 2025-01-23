const pool = require("../config/database");

class Cart {
  async create({ user_id, product_id, amount, quantity, features }) {
    const query = `
          INSERT INTO carts (user_id, product_id, amount, quantity, features)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;`;

    try {
      const result = await pool.query(query, [
        user_id,
        product_id,
        amount,
        quantity,
        features,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  async findAll(id) {
    const query = `SELECT * FROM carts WHERE user_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows;
  }

  async findOne(id) {
    const query = `SELECT * FROM carts WHERE cart_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async update(id, { user_id, product_id, amount, quantity }) {
    const query = `UPDATE carts SET user_id = '${user_id}', product_id = '${product_id}', amount = '${amount}', quantity = ${quantity} WHERE cart_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }
  async deleteAllByUserId(id) {
    const query = `DELETE FROM carts WHERE user_id = ${id} RETURNING *;`;
    const result = await pool.query(query);
    return result;
  }
  async updateQuantity(id, quantity) {
    const query = `UPDATE carts SET quantity = ${quantity} WHERE cart_id = ${id};`;
    const result = await pool.query(query);
    return result;
  }
  async delete(id) {
    const query = `DELETE FROM carts WHERE cart_id = ${id} RETURNING *;`;
    const { rows } = await pool.query(query);
    return rows[0];
  }



  async findByUserAndProduct(user_id, product_id) {
    const query = `SELECT * FROM carts WHERE user_id = '${user_id}' AND product_id = '${product_id}';`;
    const result = await pool.query(query);
    return result;
  }
}

module.exports = new Cart();
