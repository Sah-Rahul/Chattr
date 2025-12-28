import { CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Service", path: "/service" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 border-b border-[#ffffff36] lg:px-24 xl:px-32 transition-all duration-500
        ${
          isScrolled
            ? "bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4 text-gray-700"
            : "bg-[#06332e] py-4 md:py-6 text-white"
        }`}
      >
        <span className="text-xl font-bold">LOGO</span>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="relative group hover:text-[#f7a582] transition-opacity"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-current transition-all group-hover:w-full" />
            </a>
          ))}

          <button className="flex items-center cursor-pointer gap-2 border px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">
            Book Appointment
            <CalendarDays size={16} />
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div
          className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 transition-transform duration-500 md:hidden z-50
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            className="absolute top-6 right-6 text-gray-700"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-xl text-gray-700 hover:text-[#06332e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <button className="flex items-center gap-2 border border-[#06332e] text-[#06332e] px-6 py-2 rounded-full text-sm hover:bg-[#06332e] hover:text-white transition-colors mt-4">
            Book Appointment
            <CalendarDays size={16} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
