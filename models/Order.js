import mongoose from "mongoose";
import OrderProductSchema from "./OrderProduct.js";

const orderSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientTel: { type: String, required: true },
    clientWilaya: { type: String, required: true },
    clientAdress: { type: String, required: true },
    orderState: { type: String, required: true },
    clientOrder: { type: [OrderProductSchema], default: [] },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
