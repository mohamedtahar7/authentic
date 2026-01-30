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
export async function getPendingOrders() {
  await connectDB();

  const orders = await Order.find({ orderState: "pending" })
    .sort({ createdAt: -1 })
    .lean();

  return orders || [];
}
export async function getConfirmedOrders() {
  await connectDB();

  const orders = await Order.find({ orderState: "confirmed" })
    .sort({ createdAt: -1 })
    .lean();

  return orders || [];
}
export async function getShippedOrders() {
  await connectDB();

  const orders = await Order.find({ orderState: "shipped" })
    .sort({ createdAt: -1 })
    .lean();

  return orders || [];
}
// Confirm order (pending -> confirmed)
export async function confirmOrder(orderId) {
  await connectDB();
  await Order.findByIdAndUpdate(orderId, { orderState: "confirmed" });
  return { success: true };
}

// Ship order (confirmed -> shipped)
export async function shipOrder(orderId) {
  await connectDB();

  // 1️⃣ Get the order
  const order = await Order.findById(orderId).lean();
  if (!order) throw new Error("Order not found");

  // 2️⃣ Loop through ordered items
  for (const item of order.clientOrder) {
    const product = await Product.findById(item.id);
    if (!product) continue;

    // 3️⃣ Find the size inside product.sizes
    const sizeIndex = product.sizes.findIndex((s) => s.size === item.size);

    if (sizeIndex === -1) continue;

    // 4️⃣ Decrease size quantity (prevent negatives)
    product.sizes[sizeIndex].quantity = Math.max(
      0,
      product.sizes[sizeIndex].quantity - item.amount,
    );

    // 5️⃣ Recalculate total product quantity
    product.quantity = product.sizes.reduce(
      (acc, s) => acc + Number(s.quantity),
      0,
    );

    // 6️⃣ Save product
    await product.save();
  }

  // 7️⃣ Mark order as shipped
  await Order.findByIdAndUpdate(orderId, {
    orderState: "shipped",
  });

  return { success: true };
}
// Return Order
export async function returnOrder(orderId) {
  await connectDB();

  // 1️⃣ Get the order
  const order = await Order.findById(orderId).lean();
  if (!order) throw new Error("Order not found");

  // 2️⃣ Restore stock
  for (const item of order.clientOrder) {
    const product = await Product.findById(item.id);
    if (!product) continue;

    // Find size
    const sizeIndex = product.sizes.findIndex((s) => s.size === item.size);

    if (sizeIndex === -1) continue;

    // Increase size quantity
    product.sizes[sizeIndex].quantity += item.amount;

    // Recalculate total quantity
    product.quantity = product.sizes.reduce(
      (acc, s) => acc + Number(s.quantity),
      0,
    );

    await product.save();
  }

  // 3️⃣ Delete the returned order
  await Order.findByIdAndDelete(orderId);

  return { success: true };
}
// Delete order
export async function deleteOrder(orderId) {
  await connectDB();
  await Order.findByIdAndDelete(orderId);
  return { success: true };
}
