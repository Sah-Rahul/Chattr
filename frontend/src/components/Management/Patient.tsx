import React, { useState } from "react";
import {
  Search,
  User,
  UserPlus,
  Clock,
  UserCheck,
  AlertCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
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
import { Textarea } from "../ui/textarea";

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  status: "Admitted" | "Discharged" | "Outpatient";
  phone: string;
  bloodGroup: string;
  address: string;
}

const Patient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientList, setPatientList] = useState<PatientData[]>([
    {
      id: "P-001",
      name: "Rohan Sharma",
      age: 28,
      gender: "Male",
      status: "Admitted",
      phone: "+91 9876543210",
      bloodGroup: "O+",
      address: "Sector 12, Noida, UP",
    },
    {
      id: "P-002",
      name: "Anjali Gupta",
      age: 34,
      gender: "Female",
      status: "Outpatient",
      phone: "+91 8877665544",
      bloodGroup: "A-",
      address: "M G Road, Gurgaon, HR",
    },
    {
      id: "P-003",
      name: "Vikram Singh",
      age: 45,
      gender: "Male",
      status: "Discharged",
      phone: "+91 7766554433",
      bloodGroup: "B+",
      address: "Civic Center, Indore, MP",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    status: "Outpatient",
    address: "",
  });

  const addPatient = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("--- New Patient Data ---", formData);

    setIsModalOpen(false);

    setFormData({
      name: "",
      phone: "",
      age: "",
      gender: "",
      bloodGroup: "",
      status: "Outpatient",
      address: "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this patient record?")) {
      setPatientList(patientList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Patient Directory
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage hospital admissions and records.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 md:flex-none cursor-pointer bg-[#06332e]  hover:bg-[#06332e]">
                <UserPlus className="w-4 h-4 mr-2" /> New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125">
              <DialogHeader>
                <DialogTitle>Register New Patient</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new record.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={addPatient} className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      placeholder="+91..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-left">
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      required
                      min={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      onValueChange={(val) =>
                        setFormData({ ...formData, gender: val })
                      }
                      value={formData.gender}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Blood</Label>
                    <Select
                      onValueChange={(val) =>
                        setFormData({ ...formData, bloodGroup: val })
                      }
                      value={formData.bloodGroup}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="O+" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <Label>Address</Label>
                  <Textarea
                    placeholder="Full Residential Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#06332e] cursor-pointer" type="submit">
                    Save Patient
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Admitted",
            val: "142",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Discharged",
            val: "89",
            icon: UserCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Outpatients",
            val: "2,405",
            icon: User,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Critical",
            val: "12",
            icon: AlertCircle,
            color: "text-rose-600",
            bg: "bg-rose-50/50",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className={`border-none shadow-sm ring-1 ring-slate-200 ${item.bg}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                {item.label}
              </span>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search patients..."
              className="pl-9 h-9 bg-slate-50 border-slate-200"
            />
          </div>
          <div className="text-sm text-slate-500">
            Showing {patientList.length} records
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold min-w-45">
                  Patient Details
                </TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-center">Age</TableHead>
                <TableHead className="font-bold">Address</TableHead>
                <TableHead className="font-bold">Blood</TableHead>
                <TableHead className="font-bold">Contact</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {patientList.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200 uppercase">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">
                          {patient.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono tracking-tight">
                          {patient.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold border
                        ${
                          patient.status === "Admitted"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : patient.status === "Discharged"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm font-medium">
                    {patient.age}
                  </TableCell>
                  <TableCell className="max-w-50">
                    <div className="flex items-center gap-1 text-xs text-slate-500 truncate">
                      <MapPin className="w-3 h-3  shrink-0" /> {patient.address}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-700 text-sm">
                    {patient.bloodGroup}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500 whitespace-nowrap">
                    {patient.phone}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      onClick={() => handleDelete(patient.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-white border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 italic">Page 1 of 12</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs px-3 border-slate-200"
              disabled
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <div className="hidden sm:flex gap-1">
              {[1, 2, 3].map((n) => (
                <Button
                  key={n}
                  variant={n === 1 ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 text-xs ${
                    n === 1 ? "bg-indigo-600" : "border-slate-200"
                  }`}
                >
                  {n}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs px-3 border-slate-200"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Patient;
