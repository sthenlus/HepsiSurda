const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOneByEmail(email);

    if (!user) {
      return res.status(505).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(505).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ user, token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const register = async (req, res) => {
  try {
    const { email, telno, password, name, surname } = req.body;

    const isExist = await User.findOneByEmail(email);

    if (isExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log({
      email,
      telno,
      password: hashedPassword,
      name,
      surname,
    });

    const user = await User.create({
      email,
      telno,
      password: hashedPassword,
      name,
      surname,
    });

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, newPassword } = req.body;

    const user = await User.findOne(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);

    if (isMatch) {
      return res.status(400).json({
        error: "New password cannot be the same as the old password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.resetPassword(id, hashedPassword);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  resetPassword,
};
