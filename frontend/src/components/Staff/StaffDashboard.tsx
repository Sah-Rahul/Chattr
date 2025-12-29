import { useState } from "react";
import {
  Users, 
  CalendarCheck,
  FileBarChart,
  Settings, 
  Calendar,
  ClipboardList,
  Clock,
  CheckCircle,
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

const StaffDashboard = () => { 
  const [staffStats, setStaffStats] = useState({
    totalTasks: 28,
    completedTasks: 18,
    pendingTasks: 10,
    todayShift: "Morning Shift (8 AM - 4 PM)",
  });

  return (
    <>
      <main className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Staff Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your overview today.
          </p>
        </div>

        
        <Card className="mb-8 bg-linear-to-r from-[#06332e] to-[#084d45] text-white border-none shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-2">Today's Shift</p>
                <h2 className="text-3xl font-bold mb-3">
                  {staffStats.todayShift}
                </h2>
                <Badge className="bg-[#f7a582] hover:bg-[#f7a582] text-white border-none">
                  Active Now
                </Badge>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Clock className="w-9 h-9 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Total Tasks</p>
                  <h3 className="text-4xl font-bold text-gray-800 mb-3">
                    {staffStats.totalTasks}
                  </h3>
                  <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none">
                    This Week
                  </Badge>
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Completed</p>
                  <h3 className="text-4xl font-bold text-gray-800 mb-3">
                    {staffStats.completedTasks}
                  </h3>
                  <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none">
                    +64% Done
                  </Badge>
                </div>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

        
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Pending</p>
                  <h3 className="text-4xl font-bold text-gray-800 mb-3">
                    {staffStats.pendingTasks}
                  </h3>
                  <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none">
                    Need Attention
                  </Badge>
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                My Schedule
              </CardTitle>
              <CardDescription className="text-base">
                View your work schedule and shifts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#06332e] hover:bg-[#084d45] h-12 text-base">
                <Calendar className="w-5 h-5 mr-2" />
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Patient Assignments
              </CardTitle>
              <CardDescription className="text-base">
                Check your assigned patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#06332e] hover:bg-[#084d45] h-12 text-base">
                <Users className="w-5 h-5 mr-2" />
                View Patients
              </Button>
            </CardContent>
          </Card>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Today's Tasks</CardTitle>
              <CardDescription className="text-base">
                Your tasks for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    text: "Check patient vitals - Room 204",
                    time: "9:00 AM",
                    status: "completed",
                  },
                  {
                    text: "Administer medication - Room 301",
                    time: "10:30 AM",
                    status: "pending",
                  },
                  {
                    text: "Update patient records",
                    time: "2:00 PM",
                    status: "pending",
                  },
                  {
                    text: "Assist doctor with procedure",
                    time: "3:30 PM",
                    status: "upcoming",
                  },
                ].map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        task.status === "completed"
                          ? "bg-green-100"
                          : task.status === "pending"
                          ? "bg-orange-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {task.status === "completed" ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-base">
                        {task.text}
                      </p>
                      <p className="text-sm text-gray-500">{task.time}</p>
                    </div>
                    {task.status === "completed" && (
                      <Badge className="bg-green-100 text-green-700 border-none">
                        Done
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription className="text-base">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Patient Records",
                    icon: FileBarChart,
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    label: "Schedule",
                    icon: CalendarCheck,
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    label: "Medications",
                    icon: ClipboardList,
                    color: "bg-purple-100 text-purple-600",
                  },
                  {
                    label: "Settings",
                    icon: Settings,
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
      </main>
    </>
  );
};

export default StaffDashboard;
