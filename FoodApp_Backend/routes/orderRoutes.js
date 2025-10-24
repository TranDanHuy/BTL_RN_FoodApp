import express from "express";

const router = express.Router();

// (Tạm thời để rỗng, thêm sau)
router.get("/", (req, res) => {
  res.send("API đơn hàng hoạt động!");
});

export default router;
