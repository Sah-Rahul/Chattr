import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Dr. Rahul, New Road, Kathmandu"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+977 9811223344", "+977 9822115566"],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["healthcare@gmail.com", "support@medipro.com"],
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 8 AM - 5 PM", "Sunday: Emergency Only"],
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#06332e] text-white pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p
            className="text-[#f7a582] font-semibold text-sm md:text-base uppercase tracking-wider mb-4"
            data-aos="fade-up"
          >
            GET IN TOUCH
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Contact Us
          </h1>
          <p
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`w-14 h-14 ${info.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-4 pointer-events-none">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Write your message here..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#06332e] hover:bg-[#084d45] text-white font-semibold rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            <div data-aos="fade-left" className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.624987680408!2d85.32193831506144!3d27.71724598278525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190b1d1e8a3d%3A0x6c7d9b2e2f7b7c5!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kathmandu Hospital Location"
                />
              </div>

              <div className="bg-linear-to-br from-[#06332e] to-[#084d45] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-gray-300 mb-6">
                  For urgent medical assistance, please call our emergency
                  hotline or visit our hospital directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Emergency Hotline</p>
                      <p className="font-bold text-lg">+01 547 547 5478</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">24/7 Availability</p>
                      <p className="font-bold">Always Open for Emergencies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
