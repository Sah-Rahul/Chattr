import { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  Pill,
  Clock,
  Stethoscope,
  MessageCircle,
  CreditCard,
  Activity,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const UserDashboard = () => {
  const [patientStats, setPatientStats] = useState({
    upcomingAppointments: 3,
    activePrescriptions: 5,
    pendingReports: 2,
    nextAppointment: {
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "Tomorrow",
      time: "10:30 AM",
    },
  });

  useEffect(() => {
    fetchPatientStats();
  }, []);

  const fetchPatientStats = async () => {
    try {
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <Card className="mb-8 bg-linear-to-r from-[#06332e] to-[#084d45] text-white border-none shadow-lg">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-2">Next Appointment</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {patientStats.nextAppointment.doctor}
              </h2>
              <p className="text-white/90 mb-3">
                {patientStats.nextAppointment.specialty}
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[#f7a582] hover:bg-[#f7a582] text-white border-none">
                  {patientStats.nextAppointment.date}
                </Badge>
                <span className="text-white/90 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {patientStats.nextAppointment.time}
                </span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Calendar className="w-9 h-9 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  Upcoming Appointments
                </p>
                <h3 className="text-4xl font-bold text-gray-800 mb-3">
                  {patientStats.upcomingAppointments}
                </h3>
                <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none">
                  This Month
                </Badge>
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  Active Prescriptions
                </p>
                <h3 className="text-4xl font-bold text-gray-800 mb-3">
                  {patientStats.activePrescriptions}
                </h3>
                <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none">
                  Current
                </Badge>
              </div>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Pill className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">Pending Reports</p>
                <h3 className="text-4xl font-bold text-gray-800 mb-3">
                  {patientStats.pendingReports}
                </h3>
                <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none">
                  Need Review
                </Badge>
              </div>
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Health Vitals
            </CardTitle>
            <CardDescription className="text-base">
              Latest recorded measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  label: "Blood Pressure",
                  value: "120/80 mmHg",
                  status: "normal",
                  icon: Activity,
                },
                {
                  label: "Heart Rate",
                  value: "72 bpm",
                  status: "normal",
                  icon: Heart,
                },
                {
                  label: "Blood Sugar",
                  value: "95 mg/dL",
                  status: "normal",
                  icon: TrendingUp,
                },
              ].map((vital, i) => {
                const Icon = vital.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {vital.label}
                        </p>
                        <p className="text-sm text-gray-500">{vital.value}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-none">
                      Normal
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-base">
              Common tasks and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Book Appointment",
                  icon: Calendar,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  label: "Find Doctor",
                  icon: Stethoscope,
                  color: "bg-green-100 text-green-600",
                },
                {
                  label: "Chat Support",
                  icon: MessageCircle,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  label: "View Bills",
                  icon: CreditCard,
                  color: "bg-orange-100 text-orange-600",
                },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className="h-auto flex-col gap-3 p-6 hover:shadow-md transition-all border-none bg-gray-50 hover:bg-gray-100"
                  >
                    <div
                      className={`w-14 h-14 ${action.color} rounded-full flex items-center justify-center`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-medium text-gray-700 text-sm">
                      {action.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Recent Appointments</CardTitle>
            <CardDescription className="text-base">
              Your appointment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  doctor: "Dr. Sarah Wilson",
                  specialty: "Cardiologist",
                  date: "Dec 20, 2024",
                  status: "completed",
                },
                {
                  doctor: "Dr. Michael Brown",
                  specialty: "General Physician",
                  date: "Dec 15, 2024",
                  status: "completed",
                },
                {
                  doctor: "Dr. Emily Davis",
                  specialty: "Dermatologist",
                  date: "Dec 10, 2024",
                  status: "completed",
                },
              ].map((apt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-[#06332e] to-[#084d45] rounded-full flex items-center justify-center text-white font-bold">
                      {apt.doctor.split(" ")[1].charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {apt.doctor}
                      </p>
                      <p className="text-sm text-gray-500">{apt.specialty}</p>
                      <p className="text-xs text-gray-400">{apt.date}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Active Medications</CardTitle>
            <CardDescription className="text-base">
              Current prescriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Aspirin 75mg",
                  dosage: "Once daily",
                  remaining: "20 days",
                },
                {
                  name: "Lisinopril 10mg",
                  dosage: "Twice daily",
                  remaining: "15 days",
                },
                {
                  name: "Metformin 500mg",
                  dosage: "With meals",
                  remaining: "25 days",
                },
              ].map((med, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{med.name}</p>
                      <p className="text-sm text-gray-500">{med.dosage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      {med.remaining}
                    </p>
                    <p className="text-xs text-gray-500">remaining</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-none shadow-md bg-linear-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center  not-even:shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">
                Health Tip of the Day
              </h3>
              <p className="text-gray-600 text-sm">
                Remember to stay hydrated! Aim for 8 glasses of water daily to
                maintain optimal health and energy levels.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
