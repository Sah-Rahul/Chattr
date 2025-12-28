import { Award, GraduationCap, Clock, Star, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

const Doctor = () => {
    
  const doctors = [
    {
      name: "Dr. Sarah Wilson",
      age: 42,
      specialty: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: "15 years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80",
      rating: 4.9,
      patients: "2000+",
    },
    {
      name: "Dr. Michael Brown",
      age: 45,
      specialty: "Neurologist",
      qualification: "MBBS, MD (Neurology)",
      experience: "18 years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80",
      rating: 4.8,
      patients: "1800+",
    },
    {
      name: "Dr. Emily Davis",
      age: 38,
      specialty: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: "12 years",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&q=80",
      rating: 4.9,
      patients: "2500+",
    },
    {
      name: "Dr. David Lee",
      age: 50,
      specialty: "Orthopedic Surgeon",
      qualification: "MBBS, MS (Orthopedics)",
      experience: "22 years",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&q=80",
      rating: 4.7,
      patients: "1500+",
    },
    {
      name: "Dr. Jennifer Smith",
      age: 36,
      specialty: "Dermatologist",
      qualification: "MBBS, MD (Dermatology)",
      experience: "10 years",
      image:
        "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop&q=80",
      rating: 4.8,
      patients: "1200+",
    },
    {
      name: "Dr. Robert Taylor",
      age: 48,
      specialty: "General Surgeon",
      qualification: "MBBS, MS (Surgery)",
      experience: "20 years",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&q=80",
      rating: 4.9,
      patients: "1900+",
    },
    {
      name: "Dr. Lisa Anderson",
      age: 40,
      specialty: "Gynecologist",
      qualification: "MBBS, MD (Gynecology)",
      experience: "14 years",
      image:
        "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&q=80",
      rating: 4.9,
      patients: "2200+",
    },
    {
      name: "Dr. James Martinez",
      age: 44,
      specialty: "Ophthalmologist",
      qualification: "MBBS, MS (Ophthalmology)",
      experience: "16 years",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&q=80",
      rating: 4.7,
      patients: "1600+",
    },
    {
      name: "Dr. Amanda Garcia",
      age: 35,
      specialty: "Psychiatrist",
      qualification: "MBBS, MD (Psychiatry)",
      experience: "9 years",
      image:
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&q=80",
      rating: 4.8,
      patients: "1100+",
    },
  ];

    useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto mb-12 text-center" data-aos="fade-up">
        <p className="text-[#f7a582] font-semibold text-sm md:text-base uppercase tracking-wider mb-3">
          OUR DOCTORS
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Meet Our Expert Medical Team
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Our team of highly qualified and experienced doctors is dedicated to
          providing you with the best possible care.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {doctors.map((doctor, index) => (
            <Card
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border-none"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                <Badge className="absolute top-4 right-4 bg-white text-gray-800 hover:bg-white">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  {doctor.rating}
                </Badge>

                <Badge className="absolute bottom-4 left-4 bg-[#f7a582] hover:bg-[#f7a582] text-white px-4 py-2 text-sm">
                  {doctor.specialty}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {doctor.name}
                </CardTitle>
                <p className="text-gray-500 text-sm">Age: {doctor.age} years</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center  shrink-0">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Qualification
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {doctor.qualification}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center  shrink-0">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Experience
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {doctor.experience}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center  shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Patients Treated
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {doctor.patients}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-[#06332e] hover:bg-[#084d45] text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div
        className="max-w-4xl mx-auto mt-16 bg-linear-to-r from-[#06332e] to-[#084d45] rounded-2xl p-8 md:p-12 text-center text-white"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Need to Consult a Specialist?
        </h2>
        <p className="text-gray-300 mb-6 text-base md:text-lg">
          Our doctors are available for consultation. Book your appointment
          today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-8 py-6 bg-[#f7a582] hover:bg-[#e59470] text-white font-semibold text-base">
            Schedule Now
          </Button>
          <Button
            variant="outline"
            className="px-8 py-6 border-2 border-white bg-transparent hover:bg-white hover:text-[#06332e] text-white font-semibold text-base"
          >
            View All Doctors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
