import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],

  totalBillAmount: { type: Number, required: true },
  userEmail: { type: String, required: true, ref: "User" },
  orderStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Confirmed", "Delivered", "Canceled"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
