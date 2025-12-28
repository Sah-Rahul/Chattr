import {
  Award,
  Users,
  Heart,
  Shield,
  CheckCircle,
  Target,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "50+", label: "Expert Doctors", icon: Users },
    { number: "10K+", label: "Happy Patients", icon: Heart },
    { number: "25+", label: "Awards Won", icon: Shield },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "We treat every patient with empathy, respect, and dignity, ensuring comfort throughout their healthcare journey.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in medical care, continuously improving our services and expertise.",
    },
    {
      icon: Users,
      title: "Patient-Centered",
      description:
        "Your health and well-being are at the heart of everything we do, with personalized treatment plans.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards, ensuring transparency and trust in all our interactions.",
    },
  ];

  const features = [
    "24/7 Emergency Services",
    "State-of-the-art Equipment",
    "Experienced Medical Team",
    "Comprehensive Health Checkups",
    "Advanced Surgical Facilities",
    "Patient-Friendly Environment",
  ];


    useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="  text-white pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <p className="text-[#f7a582] font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
                ABOUT US
              </p>
              <h1 className="text-3xl md:text-4xl text-black lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Committed to Your Health & Well-being
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                MediPro has been serving the community for over 15 years with
                dedication and excellence. Our state-of-the-art facility
                combined with experienced medical professionals ensures you
                receive the best possible care.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We believe in a holistic approach to healthcare, treating not
                just symptoms but addressing the overall well-being of our
                patients and their families.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#06332e] backdrop-blur-sm rounded-xl p-6 text-center   transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-[#f7a582] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow"
              data-aos="fade-right"
            >
              <div className="w-16 h-16 bg-[#f7a582] rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                To provide accessible, high-quality healthcare services to our
                community, ensuring every patient receives compassionate,
                personalized care that promotes healing and wellness.
              </p>
            </div>

            <div
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow"
              data-aos="fade-left"
            >
              <div className="w-16 h-16 bg-[#06332e] rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                To be the leading healthcare provider recognized for clinical
                excellence, innovative treatments, and patient-centered care
                that transforms lives in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-[#f7a582] font-semibold text-sm md:text-base uppercase tracking-wider mb-3">
              OUR VALUES
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Our core values guide everything we do, from patient care to
              community service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-[#06332e] hover:text-white transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#f7a582] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <p className="text-[#f7a582] font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
                WHY CHOOSE US
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Your Health is Our Priority
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                We combine advanced medical technology with compassionate care
                to deliver exceptional healthcare services. Our team of
                experienced professionals is dedicated to your well-being.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center  shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left" className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=800&fit=crop&q=80"
                  alt="Hospital"
                  className="w-full h-125 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 bg-white rounded-xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f7a582] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">98%</p>
                    <p className="text-sm text-gray-600">
                      Patient Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div
          className="max-w-4xl mx-auto bg-linear-to-r from-[#06332e] to-[#084d45] rounded-2xl p-8 md:p-12 text-center text-white"
          data-aos="fade-up"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-gray-300 mb-6 text-base md:text-lg">
            Join thousands of satisfied patients who trust us with their health
          </p>
          <button className="px-8 py-3 bg-[#f7a582] hover:bg-[#e59470] text-white font-semibold rounded-lg transition-colors">
            Schedule an Appointment
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
