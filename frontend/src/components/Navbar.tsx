import { CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Service", path: "/service" },
  { name: "Doctor", path: "/all-doctors" },
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

  const user = false;

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 border-b border-[#ffffff36] lg:px-24 xl:px-32 transition-all duration-500
        ${
          isScrolled
            ? "bg-[#06332e] shadow-md backdrop-blur-lg py-3 md:py-4 text-[#f7a582] "
            : "bg-[#06332e] py-4 md:py-6 text-white"
        }`}
      >
        <Link to={"/"}>
          <h3 className="text-2xl font-bold">
            Medi<span className="text-[#f7a582]">Pro</span>
          </h3>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group hover:text-[#f7a582] transition-opacity"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-current transition-all group-hover:w-full" />
            </Link>
          ))}

          {user ? (
            <button className="flex items-center cursor-pointer gap-2 border px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">
              Book Appointment
              <CalendarDays size={16} />
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="px-8 py-1 cursor-pointer rounded-full border-2 border-[#ff9f7f] text-[#ff9f7f] hover:bg-[#ff9f7f] hover:text-[#06332e] transition">
                Login
              </button>
            </Link>
          )}
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
