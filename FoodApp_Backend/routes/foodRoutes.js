import express from "express";
import { getFoods, addFood, deleteFood } from "../controllers/foodController.js";

const router = express.Router();

router.get("/", getFoods);

router.post("/", addFood);

router.delete("/:id", deleteFood);

export default router;
