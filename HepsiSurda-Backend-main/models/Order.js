const pool = require("../config/database");

class Order {
  async create({
    user_id,
    products,
    total_price,
    delivery_method,
    delivery_address,
    payment_method,
    order_state,
  }) {
    // Eğer products zaten JSON objesi olarak geliyorsa, JSON.stringify ile stringe çevirin
    const query = `
      INSERT INTO orders (
        user_id,
        products,
        total_price,
        delivery_method,
        delivery_address,
        payment_method,
        order_state
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
      RETURNING *;`;

    try {
      const result = await pool.query(query, [
        user_id,
        JSON.stringify(products), // products'ı JSON string'e dönüştür
        total_price,
        delivery_method,
        delivery_address,
        payment_method,
        order_state,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM orders;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async findOne(id) {
    const query = `SELECT * FROM orders WHERE order_id = '${id}';`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async findByUserId(id) {
    const query = `SELECT * FROM orders WHERE user_id = '${id}';`;
    const { rows } = await pool.query(query);
    return rows;
  }

  async update(
    id,
    {
      user_id,
      products,
      total_price,
      order_date,
      delivery_method,
      delivery_address,
      payment_method,
      order_state,
    }
  ) {
    const query = `UPDATE orders SET 
        user_id = '${user_id}',
        products = '${JSON.stringify(products)}',  -- products'ı string'e dönüştür
        total_price = '${total_price}',
        order_date = '${order_date}',
        delivery_method = '${delivery_method}',
        delivery_address = '${delivery_address}',
        payment_method = '${payment_method}',
        order_state = '${order_state}' WHERE order_id = ${id};`;

    const { rows } = await pool.query(query);
    return rows[0];
  }

  async delete(id) {
    const query = `DELETE FROM orders WHERE order_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }
}

module.exports = new Order();
