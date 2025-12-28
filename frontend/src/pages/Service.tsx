import { Heart, Stethoscope, Brain, Baby, Bone, Eye, Droplet, Ambulance, Syringe, Activity, Pill, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useEffect } from "react";
 

const Service = () => {
  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Expert heart care with advanced diagnostics and treatment for all cardiac conditions.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Comprehensive neurological care for brain, spine, and nervous system disorders.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Bone,
      title: "Orthopedics",
      description: "Advanced bone and joint treatments including surgeries and rehabilitation.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents with loving care.",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Complete eye care services from routine check-ups to complex eye surgeries.",
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Primary healthcare services for common illnesses and preventive care.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Droplet,
      title: "Nephrology",
      description: "Kidney care and dialysis services with state-of-the-art equipment.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Ambulance,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response and critical care units.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Activity,
      title: "ICU Services",
      description: "Intensive care with advanced monitoring and life support systems.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Syringe,
      title: "Vaccination",
      description: "Complete immunization programs for children and adults.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Pill,
      title: "Pharmacy",
      description: "In-house pharmacy with genuine medicines and 24/7 availability.",
      color: "bg-rose-100 text-rose-600"
    },
    {
      icon: Users,
      title: "Family Care",
      description: "Comprehensive healthcare plans for entire family wellness.",
      color: "bg-violet-100 text-violet-600"
    }
  ];

    useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8 lg:px-12">
   
      <div className="max-w-7xl mx-auto mb-12 text-center" data-aos="fade-up">
        <p className="text-[#f7a582] font-semibold text-sm md:text-base uppercase tracking-wider mb-3">
          OUR SERVICES
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Healthcare Services We Provide
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          We offer comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.
        </p>
      </div>

  
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="bg-[#06332e] border-none hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <CardHeader>
                  <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-[#f7a582] transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="link" 
                    className="text-[#f7a582] font-semibold p-0 h-auto group-hover:gap-3 transition-all"
                  >
                    Learn More
                    <span className="ml-2 text-lg">→</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

       
      <div 
        className="max-w-4xl mx-auto mt-16 bg-linear-to-r from-[#06332e] to-[#084d45] rounded-2xl p-8 md:p-12 text-center text-white"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Need Medical Assistance?
        </h2>
        <p className="text-gray-300 mb-6 text-base md:text-lg">
          Our team of experienced doctors is ready to help you 24/7
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-8 py-6 bg-[#f7a582] hover:bg-[#e59470] text-white font-semibold rounded-lg text-base">
            Book Appointment
          </Button>
          <Button 
            variant="outline" 
            className="px-8 py-6 border-2 border-white bg-transparent hover:bg-white hover:text-[#06332e] text-white font-semibold rounded-lg text-base"
          >
            Call: +01 547 547 5478
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Service;