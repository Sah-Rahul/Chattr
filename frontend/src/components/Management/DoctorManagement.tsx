import { useState } from "react";
import {
  Search,
  UserPlus,
  Stethoscope,
  Trash2, 
  Calendar,
  UserRoundCheck,
  UserRoundX,
  ChevronLeft,
  ChevronRight,
  Filter, 
} from "lucide-react";

import { Card, CardContent, CardHeader } from "../ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DoctorData {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  email: string;
  phone: string;
  status: "Available" | "On Leave" | "Busy";
}

const DoctorManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const [doctors, setDoctors] = useState<DoctorData[]>([
    {
      id: "DOC-001",
      name: "Dr. Sameer Khan",
      specialization: "Cardiologist",
      experience: "12",
      email: "sameer@hospital.com",
      phone: "+91 9000011111",
      status: "Available",
    },
    {
      id: "DOC-002",
      name: "Dr. Shalini Iyer",
      specialization: "Pediatrician",
      experience: "8",
      email: "shalini@hospital.com",
      phone: "+91 9000022222",
      status: "Busy",
    },
    {
      id: "DOC-003",
      name: "Dr. Robert Wilson",
      specialization: "Neurologist",
      experience: "15",
      email: "robert@hospital.com",
      phone: "+91 9000033333",
      status: "On Leave",
    },
    {
      id: "DOC-004",
      name: "Dr. Ananya Ray",
      specialization: "Dermatologist",
      experience: "6",
      email: "ananya@hospital.com",
      phone: "+91 9000044444",
      status: "Available",
    },
    {
      id: "DOC-005",
      name: "Dr. Vikram Seth",
      specialization: "Orthopedic",
      experience: "10",
      email: "vikram@hospital.com",
      phone: "+91 9000055555",
      status: "Available",
    },
    {
      id: "DOC-006",
      name: "Dr. Megha Singh",
      specialization: "Gynecologist",
      experience: "14",
      email: "megha@hospital.com",
      phone: "+91 9000066666",
      status: "Busy",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    email: "",
    phone: "",
    status: "Available",
  });

  const uniqueSpecialties = Array.from(
    new Set(doctors.map((d) => d.specialization))
  );

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      specialtyFilter === "all" ||
      doc.specialization.toLowerCase() === specialtyFilter.toLowerCase();
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const handleAddDoctor = () => {
    const newDoc: DoctorData = {
      ...formData,
      id: `DOC-00${doctors.length + 1}`,
      status: formData.status as any,
    };
    setDoctors([newDoc, ...doctors]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      email: "",
      phone: "",
      status: "Available",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this doctor?")) {
      setDoctors(doctors.filter((doc) => doc.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Doctor Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Register and oversee hospital medical staff.
          </p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#06332e] hover:bg-[#0a4d46]">
              <UserPlus className="w-4 h-4 mr-2" /> Add New Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>Add Medical Professional</DialogTitle>
              <DialogDescription>
                Enter credentials and department details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-black">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="Dr. Rahul Dev"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 text-black">
                  <Label>Specialization</Label>
                  <Input
                    placeholder="e.g. Cardiologist"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-black">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="rahul@hospital.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 text-black">
                  <Label>Phone</Label>
                  <Input
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-black">
                  <Label>Experience (Years)</Label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 text-black">
                  <Label>Status</Label>
                  <Select
                    onValueChange={(val) =>
                      setFormData({ ...formData, status: val as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Busy">Busy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#06332e]" onClick={handleAddDoctor}>
                Register Doctor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm ring-1 ring-slate-200 text-left">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase text-slate-500">
              Total Doctors
            </span>
            <Stethoscope className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200 text-left">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase text-slate-500">
              Available
            </span>
            <UserRoundCheck className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {doctors.filter((d) => d.status === "Available").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200 text-left">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase text-slate-500">
              On Leave
            </span>
            <UserRoundX className="w-4 h-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {doctors.filter((d) => d.status === "On Leave").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-[#06332e] text-white text-left">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase opacity-80">
              Busy Status
            </span>
            <Calendar className="w-4 h-4 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {doctors.filter((d) => d.status === "Busy").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by name..."
              className="pl-9 h-9 bg-slate-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <Select
              onValueChange={(val) => {
                setSpecialtyFilter(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-50 h-9">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {uniqueSpecialties.map((spec) => (
                  <SelectItem key={spec} value={spec.toLowerCase()}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-black">
                  Doctor Info
                </TableHead>
                <TableHead className="font-bold text-black">
                  Specialization
                </TableHead>
                <TableHead className="font-bold text-black text-center">
                  Exp.
                </TableHead>
                <TableHead className="font-bold text-black">Status</TableHead>
                <TableHead className="font-bold text-black">Email</TableHead>
                <TableHead className="font-bold text-black">Contact</TableHead>
                <TableHead className="text-right font-bold text-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDoctors.length > 0 ? (
                currentDoctors.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="text-left">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold text-slate-800 text-sm">
                            {doc.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono italic">
                            {doc.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                        {doc.specialization}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm font-semibold text-slate-500">
                      {doc.experience} Yrs
                    </TableCell>
                    <TableCell className="text-left">
                      <Badge
                        className={`px-2 py-0.5 text-[10px] font-bold border rounded-md
                        ${
                          doc.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : doc.status === "Busy"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[11px] text-slate-500 text-left">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mt-1">
                        {doc.email}
                      </div>
                    </TableCell>

                    <TableCell className="text-[11px] text-slate-500 text-left">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mt-1">
                        {doc.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-600"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-slate-400 italic"
                  >
                    No doctors found for this selection.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-white border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 italic">
            Showing {currentDoctors.length} of {filteredDoctors.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 text-xs ${
                    currentPage === i + 1 ? "bg-[#06332e] text-white" : ""
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
              className="h-8 px-2"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorManagement;
