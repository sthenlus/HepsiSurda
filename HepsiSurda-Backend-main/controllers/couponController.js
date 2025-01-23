const Coupons = require("../models/Coupon");

const addCoupon = async (req, res) => {
  const { code, couponType, priceDiscount, percentDiscount, endDate } =
    req.body;
  try {
    const coupon = await Coupons.create({
      code,
      couponType,
      priceDiscount,
      percentDiscount,
      endDate,
    });
    res.status(201).json({
      message: "Coupon added successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.findAll();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCouponByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupons.findOne(code);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const { couponType, priceDiscount, percentDiscount, endDate } = req.body;
    const coupon = await Coupons.update(code, {
      couponType,
      priceDiscount,
      percentDiscount,
      endDate,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupons.delete(code);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
};
