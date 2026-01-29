import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }, // total quantity
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    sizes: [
      {
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ], // <-- array of objects
  },
  { timestamps: true },
);

/**
 * Prevent model overwrite in Next.js hot reload
 */
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
