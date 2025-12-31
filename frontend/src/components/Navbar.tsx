import { CalendarDays, Menu, X, User, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { toast } from "sonner";

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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logout successfull");
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 border-b border-[#ffffff36] lg:px-24 xl:px-32 transition-all duration-500
        ${
          isScrolled
            ? "bg-[#06332e] shadow-md backdrop-blur-lg py-3 md:py-4 text-[#f7a582]"
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

          {user && isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="w-10 h-10 border-2 border-[#f7a582]">
                    <AvatarImage src={""} alt={user.name} />
                    <AvatarFallback className="bg-[#f7a582] text-white font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/patient/dashboard")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/patient/appointments")}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>Book Appointment</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/patient/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

        {/* Mobile Menu */}
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

          {user && isAuthenticated && (
            <div className="flex flex-col items-center gap-3 mb-4">
              <Avatar className="w-16 h-16 border-2 border-[#06332e]">
                <AvatarImage src={"/images/doctor.png"} alt={user.name} />
                <AvatarFallback className="bg-[#06332e] text-white font-bold text-xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-xl text-gray-700 hover:text-[#06332e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user && isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  navigate("/patient/dashboard");
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 border border-[#06332e] text-[#06332e] px-6 py-2 rounded-full text-sm hover:bg-[#06332e] hover:text-white transition-colors"
              >
                <User size={16} />
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/patient/appointments");
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 border border-[#06332e] text-[#06332e] px-6 py-2 rounded-full text-sm hover:bg-[#06332e] hover:text-white transition-colors"
              >
                <CalendarDays size={16} />
                Book Appointment
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 border border-red-600 text-red-600 px-6 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
              <button className="flex items-center gap-2 border border-[#06332e] text-[#06332e] px-6 py-2 rounded-full text-sm hover:bg-[#06332e] hover:text-white transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
