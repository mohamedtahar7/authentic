import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    size: { type: String }, // optional
    images: { type: [String], default: [] },
  },
  { _id: false }, // because it’s a subdocument, MongoDB will not create extra _id
);

export default orderProductSchema;
