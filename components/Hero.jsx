"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="inline-block mb-4 text-sm tracking-widest uppercase text-gray-500"
          >
            New Collection
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-6xl font-semibold leading-tight text-gray-900"
          >
            Elevate your <br />
            <span className="text-gray-400">everyday style</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-6 text-gray-600 max-w-md"
          >
            Premium essentials designed for comfort, durability, and timeless
            style. Crafted to fit your lifestyle.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-8 flex items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#categories"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm font-medium rounded-full"
            >
              Shop now
            </motion.a>

            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              View lookbook →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* 1:1 Image Container */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="aspect-square rounded-3xl overflow-hidden bg-gray-100"
          >
            <motion.img
              src="https://i.postimg.cc/15jJbQhm/authentic_hero.png"
              alt="Hero product"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gray-200 blur-2xl opacity-50"
          />

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gray-100 blur-2xl opacity-60"
          />
        </motion.div>
      </div>
    </section>
  );
}
