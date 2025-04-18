import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Make sure this matches the model name of your user schema (case-sensitive)
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product", // Ensure this matches your Product model name
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  date: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
