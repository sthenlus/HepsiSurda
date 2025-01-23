const pool = require("../config/database");

class Coupons {
  async create({ code, couponType, priceDiscount, percentDiscount, endDate }) {
    const query = `
      INSERT INTO coupons 
      (code, couponType, priceDiscount, percentDiscount, endDate) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
    try {
      const { rows } = await pool.query(query, [
        code,
        couponType,
        priceDiscount,
        percentDiscount,
        endDate,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error creating coupon:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM coupons;";
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error;
    }
  }

  async findOne(code) {
    const query = `SELECT * FROM coupons WHERE code = $1;`;
    try {
      const { rows } = await pool.query(query, [code]);
      return rows[0];
    } catch (error) {
      console.error("Error finding coupon:", error);
      throw error;
    }
  }

  async update(code, { couponType, priceDiscount, percentDiscount, endDate }) {
    const query = `
      UPDATE coupons 
      SET couponType = $2, priceDiscount = $3, percentDiscount = $4, endDate = $5 
      WHERE code = $1 
      RETURNING *;
    `;
    try {
      const { rows } = await pool.query(query, [
        code,
        couponType,
        priceDiscount,
        percentDiscount,
        endDate,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error updating coupon:", error);
      throw error;
    }
  }

  async delete(code) {
    const query = `DELETE FROM coupons WHERE code = $1 RETURNING *;`;
    try {
      const { rows } = await pool.query(query, [code]);
      return rows[0];
    } catch (error) {
      console.error("Error deleting coupon:", error);
      throw error;
    }
  }
}

module.exports = new Coupons();
