const pool = require("../config/database");

class Product {
  async create({
    name,
    type,
    price,
    description,
    image,
    features,
    rating,
    campaign = false,
    discountPercent = 0,
  }) {
    const query = `INSERT INTO products (name, type, price, description, image, features, rating, campaign, discountPercent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;

    const values = [
      name,
      type,
      price,
      description,
      image,
      features,
      rating,
      campaign,
      discountPercent,
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM products;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async findOne(id) {
    const query = `SELECT * FROM products WHERE product_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async update(
    id,
    {
      name,
      type,
      price,
      description,
      image,
      features,
      rating,
      campaign,
      discountPercent,
    }
  ) {
    const query = `UPDATE products SET name = $1, type = $2, price = $3, description = $4, image = $5, features = $6, rating = $7, campaign = $8, discountPercent = $9 WHERE product_id = $10 RETURNING *;`;

    const values = [
      name,
      type,
      price,
      description,
      image,
      features,
      rating,
      campaign,
      discountPercent,
      id,
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async delete(id) {
    const query = `DELETE FROM products WHERE product_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async findByName(name) {
    const query = `SELECT * FROM products WHERE name = '${name}';`;
    const { rows } = await pool.query(query);
    return rows[0];
  }
}

module.exports = new Product();
