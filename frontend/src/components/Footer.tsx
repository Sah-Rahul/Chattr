import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#06332e]  mt-16 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f7a582] rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold">M</div>
              </div>
              <h3 className="text-2xl font-bold">
                Medi<span className="text-[#f7a582]">Pro</span>
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our family-centered approach to healthcare ensures that each
              member of your family receives personalized attention.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f7a582] rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f7a582] rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f7a582] rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f7a582] rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f7a582] rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#f7a582]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#f7a582] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#f7a582] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#f7a582] transition-colors"
                >
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#f7a582] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#f7a582] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#f7a582]">
              Contact Details
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center  shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-gray-300 text-sm pt-2">
                  Dr. Rahul Sah
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center  shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-gray-300 text-sm pt-2">
                  medihospital@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center  shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-gray-300 text-sm pt-2">
                  +977 9888220011
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center  shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-gray-300 text-sm pt-2">
                  8 AM - 5 PM, Monday - Saturday
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#f7a582]">Newsletter</h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm font-semibold">
                Subscribe To Our Newsletter
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stay informed and never miss out on the latest news, health
                tips.
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-lg outline-none focus:border-[#f7a582] transition-colors text-white placeholder-gray-500"
                />
                <button className="w-full px-6 py-3 bg-[#f7a582] hover:bg-[#e59470] text-white font-semibold rounded-lg transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6">
          <p className="text-center text-gray-400 text-sm">
            Copyright {new Date().getFullYear()} ©{" "}
            <span className="text-[#f7a582] font-semibold">MediPro</span> All
            Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
