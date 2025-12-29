import { useState } from "react";
import {
  Check,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Clock,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [allAppointments, setAllAppointments] = useState([
    {
      id: "APP-001",
      patient: "Rahul Sharma",
      time: "09:00 AM",
      date: "Today",
      type: "First Visit",
      status: "pending",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      id: "APP-002",
      patient: "Sneha Gupta",
      time: "10:30 AM",
      date: "Today",
      type: "Follow-up",
      status: "accepted",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
    {
      id: "APP-003",
      patient: "Amit Verma",
      time: "11:45 AM",
      date: "Today",
      type: "Consultation",
      status: "pending",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
    {
      id: "APP-004",
      patient: "Priya Das",
      time: "01:00 PM",
      date: "Today",
      type: "Checkup",
      status: "cancelled",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: "APP-005",
      patient: "Vikram Singh",
      time: "02:15 PM",
      date: "Tomorrow",
      type: "First Visit",
      status: "pending",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    {
      id: "APP-006",
      patient: "Meera Iyer",
      time: "04:00 PM",
      date: "Tomorrow",
      type: "Surgery Discussion",
      status: "accepted",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    },
    {
      id: "APP-007",
      patient: "Sanjay Raj",
      time: "05:30 PM",
      date: "Tomorrow",
      type: "Follow-up",
      status: "pending",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjay",
    },
  ]);

  const handleAction = (id: string, newStatus: "accepted" | "cancelled") => {
    setAllAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const filtered = allAppointments.filter(
    (app) =>
      app.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalToday = allAppointments.filter((a) => a.date === "Today").length;
  const acceptedToday = allAppointments.filter(
    (a) => a.date === "Today" && a.status === "accepted"
  ).length;
  const pendingToday = allAppointments.filter(
    (a) => a.date === "Today" && a.status === "pending"
  ).length;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen space-y-8">
      <div className="text-left">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Appointments
        </h1>
        <p className="text-slate-500 font-medium">
          Manage your schedule and patient requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Today's Total
              </p>
              <h3 className="text-2xl font-black text-slate-800">
                {totalToday}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Accepted
              </p>
              <h3 className="text-2xl font-black text-slate-800">
                {acceptedToday}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Pending Req.
              </p>
              <h3 className="text-2xl font-black text-slate-800">
                {pendingToday}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white">
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search patient or ID..."
              className="pl-9 h-11 bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#06332e]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold text-slate-900 pl-6">
                  Patient & ID
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Schedule
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Visit Type
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-center">
                  Status
                </TableHead>
                <TableHead className="text-right font-bold text-slate-900 pr-6">
                  Decisions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((app) => (
                <TableRow
                  key={app.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3 text-left">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                        <AvatarImage src={app.avatar} />
                        <AvatarFallback>{app.patient[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">
                          {app.patient}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter uppercase">
                          {app.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />{" "}
                        {app.time}
                      </div>
                      <div className="text-[11px] font-bold text-slate-400 px-2 py-0.5 bg-slate-100 rounded text-center min-w-15">
                        {app.date}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold border-slate-200 bg-slate-50"
                    >
                      {app.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`h-6 px-3 text-[10px] font-black uppercase tracking-tight border-none
                      ${
                        app.status === "accepted"
                          ? "bg-emerald-100 text-emerald-600"
                          : app.status === "cancelled"
                          ? "bg-rose-100 text-rose-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      {app.status === "pending" ? (
                        <>
                          <Button
                            onClick={() => handleAction(app.id, "cancelled")}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-rose-500 hover:bg-rose-100 rounded-full border border-rose-100 transition-all"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleAction(app.id, "accepted")}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-emerald-500 hover:bg-emerald-100 rounded-full border border-emerald-100 transition-all"
                            title="Accept"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest pr-2">
                          Finalized
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {filtered.length} Appointments Found
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 gap-1 border-slate-200 text-slate-600"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  className={`h-9 w-9 p-0 font-bold ${
                    currentPage === i + 1 ? "bg-[#06332e]" : "border-slate-200"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 gap-1 border-slate-200 text-slate-600"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Appointments;
