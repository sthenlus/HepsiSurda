const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const {
    user_id,
    products,
    total_price,
    delivery_method,
    delivery_address,
    payment_method,
    order_state,
  } = req.body;
  try {
    const order = await Order.create({
      user_id,
      products,
      total_price,
      delivery_method,
      delivery_address,
      payment_method,
      order_state,
    });
    res.status(201).json({
      message: "Order created successfully",
      status: "OK",
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findByUserId(userId);

    const getDaysDiff = (date1, date2) => {
      const diffTime = Math.abs(date2 - date1);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const today = new Date();

    const updatedOrders = orders.map((order) => {
      const orderDate = new Date(order.order_date);
      const daysDiff = getDaysDiff(orderDate, today);

      if (daysDiff === 1) {
        order.order_state = "Dağıtımda"; // If 1 day passed
      } else if (daysDiff >= 2) {
        order.order_state = "Teslim edildi"; // If 2 or more days passed
      } else {
        order.order_state = "Hazırlanıyor"; // If 0 day passed
      }

      return order;
    });

    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByUserId,
};
