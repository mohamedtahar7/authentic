"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // update total price
  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.amount * item.price,
      0,
    );
    setTotal(totalPrice);
  }, [cart]);

  // update total items count
  useEffect(() => {
    const amount = cart.reduce((acc, item) => acc + item.amount, 0);
    setItemAmount(amount);
  }, [cart]);

  // ADD TO CART (product + size aware)
  const addToCart = (product, id, size) => {
    const newItem = {
      id,
      name: product.name,
      price: product.price,
      images: product.images,
      category: product.category,
      description: product.description,
      size,
      amount: 1,
    };

    const existingItem = cart.find(
      (item) => item.id === id && item.size === size,
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, amount: item.amount + 1 }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id, size) => {
    setCart(cart.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id, size) => {
    const item = cart.find((item) => item.id === id && item.size === size);
    if (item) {
      addToCart(item, id, size);
    }
  };

  const decreaseAmount = (id, size) => {
    const item = cart.find((item) => item.id === id && item.size === size);
    if (!item) return;

    if (item.amount > 1) {
      const updatedCart = cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, amount: item.amount - 1 }
          : item,
      );
      setCart(updatedCart);
    } else {
      removeFromCart(id, size);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemAmount,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
