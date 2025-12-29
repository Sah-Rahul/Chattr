import { useState, useEffect } from "react";
import {
  Users,
  Stethoscope,
  UserPlus,
  CalendarCheck,
  FileBarChart,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalStaff: 0,
  });

  const [recentActivities, setRecentActivities] = useState([
    { text: "New patient registered", time: "5 min ago" },
    { text: "Doctor updated schedule", time: "12 min ago" },
    { text: "Staff added to payroll", time: "1 hour ago" },
    { text: "Appointment confirmed", time: "2 hours ago" },
  ]);

  useEffect(() => {
    setStats({
      totalPatients: 2847,
      totalDoctors: 124,
      totalStaff: 156,
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your hospital dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <h2 className="text-2xl font-bold">{stats.totalPatients}</h2>
              <Badge className="mt-2 bg-green-100 text-green-700">+12.5%</Badge>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="text-white w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Doctors</p>
              <h2 className="text-2xl font-bold">{stats.totalDoctors}</h2>
              <Badge className="mt-2 bg-green-100 text-green-700">+8.2%</Badge>
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Staff</p>
              <h2 className="text-2xl font-bold">{stats.totalStaff}</h2>
              <Badge className="mt-2 bg-purple-100 text-purple-700">
                +5.3%
              </Badge>
            </div>
            <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center">
              <UserPlus className="text-white w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#f7a582]" />
              Recent Appointments
            </CardTitle>
            <CardDescription>Latest appointments scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                { patient: "John Doe", time: "10:00 AM", doctor: "Dr. Smith" },
                { patient: "Jane Doe", time: "11:30 AM", doctor: "Dr. Adams" },
                { patient: "Mark Lee", time: "01:00 PM", doctor: "Dr. Brown" },
              ].map((appt, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg hover:bg-gray-100 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{appt.patient}</p>
                    <p className="text-sm text-gray-500">
                      {appt.doctor} - {appt.time}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Hospital system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((act, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-[#f7a582] rounded-full flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium">{act.text}</p>
                    <p className="text-xs text-gray-500">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common hospital tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "New Patient",
                icon: UserPlus,
                color: "bg-blue-100 text-blue-600",
              },
              {
                label: "Schedule",
                icon: CalendarCheck,
                color: "bg-green-100 text-green-600",
              },
              {
                label: "Reports",
                icon: FileBarChart,
                color: "bg-purple-100 text-purple-600",
              },
              {
                label: "Settings",
                icon: Settings,
                color: "bg-orange-100 text-orange-600",
              },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <Button
                  key={i}
                  variant="outline"
                  className="flex flex-col items-center gap-2 p-4 h-auto hover:shadow-md transition-all"
                >
                  <div
                    className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {action.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
