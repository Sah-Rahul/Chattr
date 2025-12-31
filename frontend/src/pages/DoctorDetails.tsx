import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Calendar, GraduationCap, Award } from "lucide-react";
import { getDoctorById } from "../Api/Doctor";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  age: number;
  experience: number;
  image: string;
  qualification: string;
  specialization: string;
  description: string;
}

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctor = async () => {
    try {
      const res = await getDoctorById(id!);
      setDoctor(res.data || res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading doctor details...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div>
        <Button
          onClick={handleBack}
          className="absolute top-10 left-18 cursor-pointer"
        >
          Back
        </Button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-80 object-cover"
          />

          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">{doctor.name}</h2>

            <Badge className="bg-[#f7a582] text-white">
              {doctor.specialization}
            </Badge>

            <p className="text-gray-500">Age: {doctor.age} years</p>

            <Button className="w-full bg-[#06332e] text-white mt-4">
              <Calendar className="mr-2" />
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">About Doctor</h3>
              <p className="text-gray-600 leading-relaxed">
                {doctor.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3 items-start">
                <GraduationCap className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-semibold">{doctor.qualification}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Award className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold">{doctor.experience} Years</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
