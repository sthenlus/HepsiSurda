require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const pool = require("./config/database");

const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const authRoute = require("./routes/authRoute");
const commentsRoute = require("./routes/commentsRoute");
const ordersRoute = require("./routes/ordersRoute");
const cartsRoute = require("./routes/cartsRoute");
const uploadRoute = require("./routes/uploadRoute");
const ratingRoute = require("./routes/ratingRoute");
const repliesRoute = require("./routes/repliesRoute");
const couponsRoute = require("./routes/couponsRoute");
const comparisonRoute = require("./routes/comparisonRoute");
const contactRoute = require("./routes/contactRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/auth", authRoute);
app.use("/comments", commentsRoute);
app.use("/replies", repliesRoute);
app.use("/orders", ordersRoute);
app.use("/carts", cartsRoute);
app.use("/ratings", ratingRoute);
app.use("/coupons", couponsRoute);
app.use("/comparisons", comparisonRoute);
app.use("/contacts", contactRoute);
app.use("/uploads", uploadRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("server has started on port 8080");
});
