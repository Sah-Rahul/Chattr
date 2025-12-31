import { Award, GraduationCap, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { fetchDoctors } from "../Api/Management";
import { Link } from "react-router-dom";

export interface Doctor {
  _id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  experience: string;
  image: string;
  qualification: string;
  specialization: string;
  description: string;
}

const Doctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getDoctor = async () => {
    try {
      setLoading(true);
      const res = await fetchDoctors();

      setDoctors(res?.data || res || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <p className="text-[#f7a582] font-semibold uppercase mb-3">
          OUR DOCTORS
        </p>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Meet Our Expert Medical Team
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our team of highly qualified and experienced doctors is dedicated to
          providing you with the best possible care.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <Card
              key={doctor._id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border-none"
            >
              <div className="relative h-72 overflow-hidden">
                <Link to={`details/doctor/${doctor._id}`}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                <Badge className="absolute bottom-4 left-4 bg-[#f7a582] text-white px-4 py-2">
                  {doctor.specialization}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{doctor.name}</CardTitle>
                <p className="text-gray-500 text-sm">Age: {doctor.age} years</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <GraduationCap className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Qualification</p>
                    <p className="font-semibold">{doctor.qualification}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Award className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-semibold">{doctor.experience}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link to={`/details/doctor/${doctor._id}`}>
                  <Button className="w-full bg-[#06332e] text-white">
                    <Calendar className="mr-2" />
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
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
    </div>
  );
};

export default Doctor;
