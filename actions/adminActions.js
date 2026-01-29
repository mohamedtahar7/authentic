"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function createProduct({
  name,
  price,
  category,
  description,
  sizes,
  images,
}) {
  await connectDB();

  // Calculate total quantity from all sizes
  const totalQuantity = sizes.reduce(
    (acc, item) => acc + Number(item.quantity),
    0,
  );

  const product = await Product.create({
    name,
    price,
    quantity: totalQuantity, // total quantity automatically calculated
    category,
    description,
    sizes, // array of { size, quantity }
    images,
  });

  return { success: true };
}
export async function getProductById(id) {
  await connectDB();
  const product = await Product.findById(id).lean();
  return JSON.parse(JSON.stringify(product));
}
export async function updateProduct(productId, updates) {
  await connectDB();

  // Recalculate total quantity from sizes
  const totalQuantity = updates.sizes.reduce(
    (acc, s) => acc + Number(s.quantity),
    0,
  );

  await Product.findByIdAndUpdate(
    productId,
    {
      name: updates.name,
      price: updates.price,
      sizes: updates.sizes,
      quantity: totalQuantity,
    },
    { new: true },
  );

  return { success: true };
}
export async function getAllProducts() {
  await connectDB();

  const products = await Product.find().lean();

  // 🔥 REMOVE _id from sizes + serialize everything
  const cleanProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
    sizes: product.sizes.map((s) => ({
      size: s.size,
      quantity: s.quantity,
    })),
  }));

  return cleanProducts;
}
// Delete product by ID
export async function deleteProduct(productId) {
  await connectDB();
  await Product.findByIdAndDelete(productId);
  return { success: true };
}
import Order from "@/models/Order";

export async function createOrder({
  clientName,
  clientEmail,
  clientTel,
  clientWilaya,
  clientAdress,
  clientOrder,
}) {
  await connectDB();

  await Order.create({
    clientName,
    clientEmail,
    clientTel,
    clientWilaya,
    clientAdress,
    orderState: "pending",
    clientOrder,
  });

  return { success: true };
}
