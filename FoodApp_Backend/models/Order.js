import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      food: {
        type: Object, // có thể dùng Schema.Types.Mixed nếu muốn linh hoạt
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: String, required: true },
});

export default mongoose.model("Order", orderSchema);
