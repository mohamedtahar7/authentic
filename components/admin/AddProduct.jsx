"use client";

import { useState, useEffect } from "react";
import { createProduct } from "@/actions/adminActions";
import axios from "axios";
import { Toaster, toast } from "sonner";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = [
  "Shirts",
  "Pants",
  "Jackets",
  "Accessories",
  "Sweatshirts",
  "Quarterzips",
];

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [chosenSize, setChosenSize] = useState([]);
  const [chosenSizeQuantity, setChosenSizeQuantity] = useState([]);
  const [sizes, setSizes] = useState([]); // [{ size, quantity }]
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgsNum, setImgsNum] = useState(1);
  const [sizeNum, setSizeNum] = useState(1);
  const [sizeRows, setSizeRows] = useState([{ size: "", quantity: "" }]);

  /* ---------- SIZE HANDLING ---------- */
  // const toggleSize = (size) => {
  //   setSizes((prev) =>
  //     prev.find((s) => s.size === size)
  //       ? prev.filter((s) => s.size !== size)
  //       : [...prev, { size, quantity: 1 }],
  //   );
  // };

  // const updateSizeQuantity = (size, value) => {
  //   setSizes((prev) =>
  //     prev.map((s) =>
  //       s.size === size ? { ...s, quantity: Number(value) } : s,
  //     ),
  //   );
  // };
  /* ---------- IMAGE UPLOAD ---------- */
  const uploadImg = async (imgs) => {
    const uploadedUrls = [];

    for (const img of imgs) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "authentic_preset");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dzrmb6yah/image/upload",
          data,
        );

        uploadedUrls.push(res.data.secure_url);
      } catch (error) {
        console.log(error);
      }
    }

    return uploadedUrls;
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (name, price, category, description, images) => {
    setLoading(true);
    try {
      const imageUrls = await uploadImg(images);
      const sizes = sizeRows
        .filter((row) => row.size && row.quantity)
        .map((row) => ({
          size: row.size,
          quantity: Number(row.quantity),
        }));

      if (sizes.length === 0) {
        toast.error("Add at least one size");
        setLoading(false);
        return;
      }
      await createProduct({
        name,
        price,
        category,
        description,
        sizes,
        images: imageUrls,
      });

      toast.success("Product Added!");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setSizes([]);
      setImages([null]);
    } catch {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
      <Toaster richColors />
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(name, price, category, description, images);
        }}
        className="space-y-6"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (DZD)"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-3 bg-white"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        {/* ---------- SIZES WITH QUANTITY ---------- */}
        <div>
          <p className="font-medium mb-2">Sizes</p>
          <div className="space-y-3">
            {/* {SIZES.map((size) => {
              const selected = sizes.find((s) => s.size === size);

              return (
                <div key={size} className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => toggleSize(size)}
                    />
                    {size}
                  </label>

                  {selected && (
                    <input
                      type="number"
                      min={1}
                      value={selected.quantity}
                      onChange={(e) => updateSizeQuantity(size, e.target.value)}
                      className="w-24 border rounded-lg px-3 py-2"
                    />
                  )}
                </div>
              );
            })} */}
            {sizeRows.map((row, index) => (
              <div key={index} className="flex gap-3">
                <select
                  value={row.size}
                  onChange={(e) => {
                    const updated = [...sizeRows];
                    updated[index].size = e.target.value;
                    setSizeRows(updated);
                  }}
                  className="w-full border rounded-lg px-4 py-3 bg-white"
                >
                  <option value="">Select Size</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={1}
                  value={row.quantity}
                  onChange={(e) => {
                    const updated = [...sizeRows];
                    updated[index].quantity = e.target.value;
                    setSizeRows(updated);
                  }}
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Quantity"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setSizeRows([...sizeRows, { size: "", quantity: "" }])
              }
              className="mt-3 text-sm underline"
            >
              + Add size
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Product Images</p>

          <div className="space-y-3">
            {Array.from({ length: imgsNum }).map((_, index) => (
              <input
                key={index}
                type="file"
                accept="image/*"
                onChange={(e) => setImages([...images, e.target.files[0]])}
                className="w-full border rounded-lg px-4 py-3"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setImgsNum(imgsNum + 1)}
            className="mt-3 text-sm underline hover:opacity-70"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
