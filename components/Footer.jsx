export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://i.postimg.cc/7YY3xQMz/logo-2.png"
              alt="Authentic Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Authentic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
