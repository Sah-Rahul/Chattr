import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Video,
  Filter,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const specialties = [
    { id: "all", label: "All", icon: Stethoscope },
    { id: "cardiology", label: "Cardiology", icon: Heart },
    { id: "neurology", label: "Neurology", icon: Brain },
    { id: "orthopedics", label: "Orthopedics", icon: Bone },
    { id: "pediatrics", label: "Pediatrics", icon: Baby },
    { id: "ophthalmology", label: "Ophthalmology", icon: Eye },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      reviews: 245,
      location: "MediCare Hospital, Downtown",
      fee: "Rs800",
      availability: "Available Today",
      image: "SW",
      qualifications: "MBBS, MD (Cardiology)",
      types: ["In-Person", "Video"],
      nextSlot: "2:00 PM Today",
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialty: "Neurologist",
      experience: "18 years",
      rating: 4.8,
      reviews: 198,
      location: "City Medical Center",
      fee: "Rs1200",
      availability: "Available Tomorrow",
      image: "MB",
      qualifications: "MBBS, MD (Neurology)",
      types: ["In-Person", "Video"],
      nextSlot: "10:00 AM Tomorrow",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen space-y-8 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-none mb-3">
            Find Specialist Doctors
          </h1>
          <p className="text-slate-500 font-medium">
            Search and book top-rated doctors for your health concerns.
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-white px-4 py-1.5 border-slate-200 text-slate-600 font-bold"
        >
          {doctors.length} Doctors Available
        </Badge>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name, specialty, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-11 border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
              >
                <Filter className="w-4 h-4 mr-2 text-[#f7a582]" /> Filters
              </Button>
              <Button className="h-11 bg-[#06332e] hover:bg-[#0a4d46] px-8 font-bold shadow-lg shadow-emerald-900/10">
                Search Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          Browse Specialties <ChevronRight className="w-3 h-3" />
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            const isActive = selectedSpecialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl whitespace-nowrap transition-all border font-bold text-sm ${
                  isActive
                    ? "bg-[#06332e] text-white border-[#06332e] shadow-md shadow-emerald-900/10"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#f7a582]/50 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#f7a582]" : "text-slate-400"
                  }`}
                />
                {spec.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="border-none shadow-sm ring-1 ring-slate-200 bg-white group hover:ring-[#f7a582]/50 transition-all overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 bg-slate-100 flex flex-col items-center justify-center p-6 sm:p-0 relative border-b sm:border-b-0 sm:border-r border-slate-100">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center text-[#06332e] font-black text-2xl border border-slate-200 mb-3">
                    {doctor.image}
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px] font-black uppercase">
                    {doctor.experience} Exp
                  </Badge>
                </div>

                <div className="flex-1 p-5 md:p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-[#06332e] transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-[#f7a582] text-xs font-black uppercase tracking-tight">
                        {doctor.specialty}
                      </p>
                      <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tighter italic">
                        {doctor.qualifications}
                      </p>
                    </div>
                    <div className="bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-black text-amber-700">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-300" />
                      <span className="text-[11px] font-bold truncate">
                        {doctor.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4 text-slate-300" />
                      <span className="text-[11px] font-bold">
                        {doctor.nextSlot}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {doctor.types.map((type, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-slate-50 border-slate-100 text-slate-500 font-bold text-[9px] uppercase tracking-tighter"
                      >
                        {type === "Video" ? (
                          <Video className="w-2.5 h-2.5 mr-1" />
                        ) : (
                          <MapPin className="w-2.5 h-2.5 mr-1" />
                        )}
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Fee
                </p>
                <p className="text-xl font-black text-slate-800">
                  {doctor.fee}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-10 text-xs font-bold border-slate-200"
                >
                  View Profile
                </Button>
                <Button className="h-10 bg-[#06332e] hover:bg-[#0a4d46] text-xs font-bold px-6">
                  Book Appointment
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-black text-slate-800">
            Popular Categories
          </CardTitle>
          <CardDescription className="text-xs font-medium">
            Quickly access most searched medical fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              {
                name: "Cardiology",
                icon: Heart,
                color: "bg-rose-50 text-rose-600",
              },
              {
                name: "Neurology",
                icon: Brain,
                color: "bg-purple-50 text-purple-600",
              },
              {
                name: "Pediatrics",
                icon: Baby,
                color: "bg-pink-50 text-pink-600",
              },
              {
                name: "Ophthalmology",
                icon: Eye,
                color: "bg-blue-50 text-blue-600",
              },
            ].map((spec, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-[#f7a582]/30 transition-all cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 ${spec.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <spec.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-slate-700 tracking-tight">
                  {spec.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindDoctors;
