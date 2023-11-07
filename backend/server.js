require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db/Database");
const { PORT } = require("./utils/variables");
const { NotFound, ErrorHanlder } = require("./middleware/ErrorHandler");
const userRoute = require("./routes/users/UserRoute");
const postsRoute = require("./routes/posts/PostsRoute");
const categoryRoute = require("./routes/posts/CategoryRoute");
const commentRoute = require("./routes/posts/CommentRoute");
const careerRoute = require("./routes/CarerrRoute");
const aboutRoute = require("./routes/AboutRoute");
const contactRoute = require("./routes/ContactRoute");
const orderRoute = require("./routes/order/OrderRoute");
const AssetLimitConfigRoute = require("./routes/posts/AssetLimitConfigRoute");
const PriceLimitConfigRoute = require("./routes/order/PriceLimitConfigRoute");
const createHomeSliderRoute = require("./routes/SettingRoute");
const PaymentRoute = require("./routes/order/PaymentRoute");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// Route middle
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/career", careerRoute);
app.use("/api/v1/about", aboutRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/asset-limit", AssetLimitConfigRoute);
app.use("/api/v1/price-limit", PriceLimitConfigRoute);
app.use("/api/v1/setting", createHomeSliderRoute);

app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", PaymentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Photo Idol");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handler
app.use(NotFound);
app.use(ErrorHanlder);
// contect to DB
app.listen(PORT, console.log("Starting Photo viewer on port " + PORT));
ConnectDB();
