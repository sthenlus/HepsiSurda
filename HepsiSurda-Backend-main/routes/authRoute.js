const express = require("express");
const router = express.Router();
const {
  register,
  login,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);

module.exports = router;
