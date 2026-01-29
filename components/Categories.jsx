import Link from "next/link";

const categories = [
  {
    name: "Shirts",
    slug: "shirts",
    image: "https://i.postimg.cc/rsCz99L3/02.jpg",
  },
  {
    name: "Pants",
    slug: "pants",
    image: "https://i.postimg.cc/PJZ1nZnY/01.jpg",
  },
  {
    name: "Jackets",
    slug: "jackets",
    image: "https://i.postimg.cc/VNL90dnV/01.jpg",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://i.postimg.cc/23R3QXJL/01.jpg",
  },
  {
    name: "Sweatshirts",
    slug: "sweatshirts",
    image: "https://i.postimg.cc/jdMSd2qr/01.jpg",
  },
  {
    name: "Quarterzips",
    slug: "quarterzips",
    image: "https://i.postimg.cc/pV8jTD39/02.jpg",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Shop by Category
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative h-48 md:h-56 rounded-lg overflow-hidden"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${category.image})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

            {/* Text */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <span className="text-white text-xl font-semibold tracking-wide">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
