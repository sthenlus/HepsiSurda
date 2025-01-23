const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orderController");

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getAllOrders);
router.get("/:userId", ordersController.getOrderByUserId);

module.exports = router;
