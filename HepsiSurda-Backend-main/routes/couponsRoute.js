const express = require("express");
const router = express.Router();

const {
  addCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

router.get("/", getAllCoupons);
router.get("/:code", getCouponByCode);
router.post("/", addCoupon);
router.patch("/:code", updateCoupon);
router.delete("/:code", deleteCoupon);

module.exports = router;
