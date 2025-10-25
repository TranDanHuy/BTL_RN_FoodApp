import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Kiểm tra server
app.get("/", (req, res) => {
  res.send("🍽 FoodApp Backend API is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(` Server running on ${PORT}`)
);
