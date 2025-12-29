import { useState } from "react";
import {
  Search, 
  MoreVertical,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  TestTube,
  ArrowRightLeft,
} from "lucide-react";
import { Card } from "../ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const patients = [
    {
      id: "PT-7821",
      name: "Rahul Sharma",
      age: 42,
      gender: "Male",
      bloodGroup: "O+",
      lastVisit: "24 Dec 2023",
      status: "Stable",
      contact: "+91 94353-55001",
      disease: "Hypertension",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      id: "PT-9012",
      name: "Sneha Gupta",
      age: 28,
      gender: "Female",
      bloodGroup: "B-",
      lastVisit: "28 Dec 2023",
      status: "Critical",
      contact: "+91 98765-43210",
      disease: "Acute Asthma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
    {
      id: "PT-4432",
      name: "Amit Verma",
      age: 55,
      gender: "Male",
      bloodGroup: "A+",
      lastVisit: "15 Dec 2023",
      status: "Recovering",
      contact: "+91 91234-56789",
      disease: "Diabetes Type 2",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
    {
      id: "PT-2210",
      name: "Priya Das",
      age: 34,
      gender: "Female",
      bloodGroup: "AB+",
      lastVisit: "Today",
      status: "Stable",
      contact: "+91 88888-77777",
      disease: "Post-Op Checkup",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: "PT-3345",
      name: "Vikram Singh",
      age: 45,
      gender: "Male",
      bloodGroup: "O-",
      lastVisit: "20 Dec 2023",
      status: "Stable",
      contact: "+91 77777-66666",
      disease: "Thyroid",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (num: number) =>
    num >= 1 && num <= totalPages && setCurrentPage(num);

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 font-sans">
            Patient Directory
          </h1>
          <p className="text-slate-500 font-medium">
            Monitor contact details, health status and medical records.
          </p>
        </div>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, ID or contact..."
              className="pl-9 bg-slate-50 border-none h-10 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#06332e]"
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
            <TableHeader className="bg-slate-50/50 text-left">
              <TableRow>
                <TableHead className="font-bold text-slate-900 pl-6">
                  Patient Details
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Health Condition
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Contact Number
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Last Visit
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-center">
                  Status
                </TableHead>
                <TableHead className="text-right font-bold text-slate-900 pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3 text-left">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm transition-transform group-hover:scale-105">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback>{patient.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-none mb-1">
                          {patient.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                          {patient.id} • {patient.age}Y • {patient.gender}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-600">
                        {patient.disease}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-2 group/phone">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover/phone:bg-blue-600 group-hover/phone:text-white transition-colors"></div>
                      <span className="text-sm font-bold text-slate-600 font-mono tracking-tight cursor-pointer hover:text-blue-600 transition-colors">
                        {patient.contact}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-left text-sm font-medium text-slate-500 italic">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`h-5 text-[10px] font-black uppercase tracking-tight border-none 
                      ${
                        patient.status === "Critical"
                          ? "bg-rose-100 text-rose-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white hover:shadow-sm ring-1 ring-transparent hover:ring-slate-200 transition-all"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 p-2 rounded-xl shadow-xl border-slate-200"
                      >
                        <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest p-2">
                          Patient Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center gap-2 font-semibold text-slate-700 p-2 cursor-pointer focus:bg-slate-50 rounded-lg">
                          <FileText className="w-4 h-4 text-indigo-500" /> View
                          Medical History
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 font-semibold text-slate-700 p-2 cursor-pointer focus:bg-slate-50 rounded-lg">
                          <TestTube className="w-4 h-4 text-amber-500" /> Order
                          Laboratory Test
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 font-semibold text-slate-700 p-2 cursor-pointer focus:bg-slate-50 rounded-lg">
                          <ArrowRightLeft className="w-4 h-4 text-blue-500" />{" "}
                          Ward Transfer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 font-semibold text-rose-600 p-2 cursor-pointer focus:bg-rose-50 rounded-lg">
                          <LogOut className="w-4 h-4" /> Initiate Discharge
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Displaying Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-slate-200 font-bold text-xs"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-3 h-3 mr-1" /> Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 text-xs font-black ${
                    currentPage === i + 1
                      ? "bg-[#06332e] text-white"
                      : "text-slate-600 border-slate-200 hover:bg-white"
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-slate-200 font-bold text-xs"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Patients;
