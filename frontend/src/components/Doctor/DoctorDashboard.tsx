import { useState } from "react";
import {
  Calendar,
  Clock,
  History,
  FileText,
  Check,
  X,
  ArrowRight,
  Stethoscope,
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
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const appointments = [
    {
      id: "APP-101",
      patientName: "Rahul Sharma",
      time: "10:30 AM",
      type: "Follow-up",
      status: "pending",
    },
    {
      id: "APP-102",
      patientName: "Sneha Gupta",
      time: "11:15 AM",
      type: "Consultation",
      status: "accepted",
    },
    {
      id: "APP-103",
      patientName: "Amit Verma",
      time: "12:00 PM",
      type: "Routine Checkup",
      status: "pending",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Doctor Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your availability, appointments, and prescriptions.
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#06332e] hover:bg-[#0a4d46] shadow-lg">
                <Clock className="w-4 h-4 mr-2" /> Set Availability
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Set Availability Slots</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 text-left">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="col-span-1 text-black">
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slots" className="col-span-1 text-black">
                    Slots
                  </Label>
                  <Input
                    id="slots"
                    placeholder="e.g. 10:00, 11:00"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-[#06332e]">Save Slots</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-500 uppercase">
                Today's Appointments
              </p>
              <h3 className="text-2xl font-black text-slate-800">12</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-500 uppercase">
                Treated Today
              </p>
              <h3 className="text-2xl font-black text-slate-800">08</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-[#06332e] text-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest">
                Next Patient
              </p>
              <h3 className="text-2xl font-black">In 15 Mins</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="text-left">
              <CardTitle className="text-xl font-bold">
                Appointment Queue
              </CardTitle>
              <CardDescription>
                Accept or Reject incoming requests
              </CardDescription>
            </div>
            <Badge className="bg-slate-100 text-slate-600 border-none font-bold">
              Live Updates
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-112.5">
              <div className="divide-y divide-slate-100">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                        {appt.patientName.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-800">
                          {appt.patientName}
                        </p>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">
                          ID: {appt.id} • {appt.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-700">
                          {appt.time}
                        </p>
                        <Badge
                          className={`text-[10px] h-4 ${
                            appt.status === "pending"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-emerald-100 text-emerald-600"
                          } border-none uppercase`}
                        >
                          {appt.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        {appt.status === "pending" ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-rose-500 hover:bg-rose-50 rounded-full ring-1 ring-rose-100"
                            >
                              <X className="w-4 h-4" />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-emerald-500 hover:bg-emerald-50 rounded-full ring-1 ring-emerald-100"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 border-slate-200 text-indigo-600 font-bold hover:bg-indigo-50"
                              >
                                <FileText className="w-4 h-4 mr-1.5" />{" "}
                                Prescribe
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-125">
                              <DialogHeader>
                                <DialogTitle>Patient Prescription</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4 text-left text-black">
                                <div className="space-y-2">
                                  <Label>Diagnosis</Label>
                                  <Input placeholder="Enter diagnosis..." />
                                </div>
                                <div className="space-y-2">
                                  <Label>Medicines & Instructions</Label>
                                  <Textarea
                                    placeholder="1. Paracetamol (500mg) - Twice daily"
                                    className="min-h-25"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button className="bg-[#06332e]">
                                  Send Prescription
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <History className="w-5 h-5 text-[#06332e]" /> Quick History
                Check
              </CardTitle>
              <CardDescription>
                Search patient ID to see history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Patient ID..."
                  className="bg-slate-50 h-9"
                />
                <Button size="sm" className="bg-[#06332e] h-9">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                  Previous Records
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700 flex justify-between items-center">
                    <span>Chest Pain</span>
                    <span className="text-[10px] text-slate-400">
                      12 Dec 2023
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-700 flex justify-between items-center">
                    <span>Viral Fever</span>
                    <span className="text-[10px] text-slate-400">
                      05 Oct 2023
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">
                Upcoming Seminars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-left space-y-2">
                <Badge className="bg-indigo-100 text-indigo-700 border-none font-bold">
                  CME Event
                </Badge>
                <p className="text-sm font-bold text-slate-800">
                  Advanced Cardiology Research
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Tomorrow at 05:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
