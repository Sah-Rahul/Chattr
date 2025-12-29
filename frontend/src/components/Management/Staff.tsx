import { useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  Trash2, 
  Clock,
  Filter,
  ShieldCheck,
  UserX,
  ChevronLeft,
  ChevronRight, 
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

interface StaffData {
  id: string;
  name: string;
  role: string;
  shift: "Day" | "Night" | "Evening";
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const [staffList, setStaffList] = useState<StaffData[]>([
    {
      id: "STF-101",
      name: "Anjali Verma",
      role: "Nurse",
      shift: "Day",
      email: "anjali@hospital.com",
      phone: "+91 9898012345",
      status: "Active",
    },
    {
      id: "STF-102",
      name: "Rahul Singh",
      role: "Receptionist",
      shift: "Evening",
      email: "rahul.s@hospital.com",
      phone: "+91 9898012346",
      status: "Active",
    },
    {
      id: "STF-103",
      name: "Suman Lata",
      role: "Lab Tech",
      shift: "Night",
      email: "suman@hospital.com",
      phone: "+91 9898012347",
      status: "Inactive",
    },
    {
      id: "STF-104",
      name: "Vikram Batra",
      role: "Pharmacist",
      shift: "Day",
      email: "vikram@hospital.com",
      phone: "+91 9898012348",
      status: "Active",
    },
    {
      id: "STF-105",
      name: "Priya Sharma",
      role: "Nurse",
      shift: "Night",
      email: "priya@hospital.com",
      phone: "+91 9898012349",
      status: "Active",
    },
    {
      id: "STF-106",
      name: "Karan Johar",
      role: "Cleaning Staff",
      shift: "Day",
      email: "karan@hospital.com",
      phone: "+91 9898012350",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    shift: "Day",
    email: "",
    phone: "",
    status: "Active",
  });

  const filteredStaff = staffList.filter((staff) => {
    const matchesRole =
      roleFilter === "all" ||
      staff.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const handleAddStaff = () => {
    const newStaff: StaffData = {
      ...formData,
      id: `STF-${100 + staffList.length + 1}`,
      shift: formData.shift as any,
      status: formData.status as any,
    };
    setStaffList([newStaff, ...staffList]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      role: "",
      shift: "Day",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this staff member from records?")) {
      setStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Staff Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage nurses, admins, and support staff records.
          </p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#06332e] hover:bg-[#0a4d46]">
              <UserPlus className="w-4 h-4 mr-2" /> Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>Register New Staff</DialogTitle>
              <DialogDescription>
                Add a new employee to the hospital system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-left text-black">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    placeholder="e.g. Nurse"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="staff@hospital.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-black">
                <div className="space-y-2">
                  <Label>Shift</Label>
                  <Select
                    onValueChange={(val) =>
                      setFormData({ ...formData, shift: val as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day">Day Shift</SelectItem>
                      <SelectItem value="Evening">Evening Shift</SelectItem>
                      <SelectItem value="Night">Night Shift</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    onValueChange={(val) =>
                      setFormData({ ...formData, status: val as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Active" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#06332e]" onClick={handleAddStaff}>
                Add Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Total Staff
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffList.length}</div>
            <p className="text-[10px] text-slate-400 mt-1">
              Hospital employees
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Active
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staffList.filter((s) => s.status === "Active").length}
            </div>
            <p className="text-[10px] text-emerald-500 mt-1">
              Currently serving
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Inactive
            </span>
            <UserX className="w-4 h-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staffList.filter((s) => s.status === "Inactive").length}
            </div>
            <p className="text-[10px] text-rose-500 mt-1">On leave/Retired</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-[#06332e] text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase opacity-80 tracking-wider">
              Shift Load
            </span>
            <Clock className="w-4 h-4 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/7</div>
            <p className="text-[10px] opacity-70 mt-1">Support Available</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by name or role..."
              className="pl-9 h-9 bg-slate-50"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
            <Select
              onValueChange={(val) => {
                setRoleFilter(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-45 h-9">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="nurse">Nurses</SelectItem>
                <SelectItem value="receptionist">Receptionists</SelectItem>
                <SelectItem value="lab tech">Lab Techs</SelectItem>
                <SelectItem value="pharmacist">Pharmacists</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-black">
                  Staff Info
                </TableHead>
                <TableHead className="font-bold text-black">Role</TableHead>
                <TableHead className="font-bold text-black text-center">
                  Shift
                </TableHead>
                <TableHead className="font-bold text-black text-center">
                  Status
                </TableHead>
                <TableHead className="font-bold text-black">Email</TableHead>

                <TableHead className="font-bold text-black">Contact</TableHead>
                <TableHead className="text-right font-bold text-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStaff.length > 0 ? (
                currentStaff.map((staff) => (
                  <TableRow
                    key={staff.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold text-slate-800 text-sm">
                            {staff.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono italic">
                            {staff.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                        {staff.role}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className="bg-slate-50 text-slate-700 font-semibold border-slate-200"
                      >
                        {staff.shift}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-2 py-0.5 text-[10px] font-bold border rounded-md
                        ${
                          staff.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {staff.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-[11px] text-slate-500">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mt-1">
                        {staff.email}
                      </div>
                    </TableCell>

                    <TableCell className="text-[11px] text-slate-500">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mt-1">
                        {staff.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-600"
                        onClick={() => handleDelete(staff.id)}
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
                    className="text-center py-10 text-slate-400 italic font-medium"
                  >
                    No results found for your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-white border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 italic">
            Showing {currentStaff.length} of {filteredStaff.length} results
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

export default Staff;
