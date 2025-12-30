import { useState, useEffect } from "react";
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
  Loader2,
  Upload,
  ImageIcon,
  X
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
import { toast } from "sonner";
import { fetchDoctors } from "../../Api/Patient";

interface DoctorData {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
  };
  specialization: string;
  qualification: string;
  experience: number;
  age: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const DoctorManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    email: "",
    phone: "",
    qualification: "",
    age: "",
    description: "",
    doctorImage: null as File | null,
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data || []);
    } catch (error: any) {
      console.error("Error fetching doctors:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      setFormData({ ...formData, doctorImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, doctorImage: null });
    setImagePreview(null);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      specialtyFilter === "all" ||
      doc.specialization.toLowerCase() === specialtyFilter.toLowerCase();
    const matchesSearch = doc.userId.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const handleAddDoctor = async () => {
    try {
      if (!formData.name || !formData.email || !formData.specialization) {
        toast.error("Please fill required fields");
        return;
      }
      toast.success("Doctor registered successfully!");
      setIsModalOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error("Failed to add doctor");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", specialization: "", experience: "", email: "",
      phone: "", qualification: "", age: "", description: "", doctorImage: null,
    });
    setImagePreview(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this doctor?")) {
      setDoctors(doctors.filter((doc) => doc._id !== id));
      toast.success("Doctor removed successfully!");
    }
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === "approved";
    return (
      <Badge className={`px-2 py-0.5 text-[10px] font-bold border rounded-md ${
          isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
        }`}>
        {isActive ? "Approved" : "Pending"}
      </Badge>
    );
  };

  const stats = {
    total: doctors.length,
    approved: doctors.filter((d) => d.status === "approved").length,
    pending: doctors.filter((d) => d.status === "pending").length,
    active: doctors.filter((d) => d.userId.isActive).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#06332e]" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen space-y-8 text-left">
  
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Doctor Management</h1>
          <p className="text-muted-foreground text-sm font-medium">Register and oversee hospital medical staff.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if(!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-[#06332e] hover:bg-[#0a4d46] shadow-lg shadow-emerald-900/10">
              <UserPlus className="w-4 h-4 mr-2" /> Add New Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Register Professional</DialogTitle>
              <DialogDescription className="font-medium">Upload profile photo and enter medical credentials.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-5 p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 group hover:border-[#06332e]/30 transition-all">
                <div className="relative w-24 h-24 rounded-xl bg-white border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={removeImage} className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-black text-slate-700">Doctor's Photo</Label>
                  <div className="flex items-center gap-2">
                    <Input id="img-input" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <Button type="button" variant="outline" size="sm" className="font-bold h-9 border-slate-200 shadow-sm" onClick={() => document.getElementById('img-input')?.click()}>
                      <Upload className="w-4 h-4 mr-2 text-[#f7a582]" /> Choose Image
                    </Button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">Max size: 2MB (JPG/PNG)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label className="font-bold">Full Name</Label><Input placeholder="Dr. Rahul Dev" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="space-y-2"><Label className="font-bold">Specialization</Label><Input placeholder="e.g. Cardiologist" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} /></div>
                <div className="space-y-2"><Label className="font-bold">Email</Label><Input type="email" placeholder="rahul@hospital.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                <div className="space-y-2"><Label className="font-bold">Phone</Label><Input placeholder="+91..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
                <div className="space-y-2"><Label className="font-bold">Qualification</Label><Input placeholder="MBBS, MD" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2"><Label className="font-bold">Exp (Yrs)</Label><Input type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} /></div>
                  <div className="space-y-2"><Label className="font-bold">Age</Label><Input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} /></div>
                </div>
              </div>
              <div className="space-y-2"><Label className="font-bold">Description</Label><Input placeholder="Brief bio..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
            </div>

            <DialogFooter className="border-t pt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="font-bold">Cancel</Button>
              <Button className="bg-[#06332e] font-bold px-8" onClick={handleAddDoctor}>Register Professional</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Doctors", val: stats.total, icon: Stethoscope, color: "text-indigo-600", bg: "bg-white" },
          { label: "Approved", val: stats.approved, icon: UserRoundCheck, color: "text-emerald-600", bg: "bg-white" },
          { label: "Pending", val: stats.pending, icon: UserRoundX, color: "text-amber-600", bg: "bg-white" },
          { label: "Active", val: stats.active, icon: Calendar, color: "text-white", bg: "bg-[#06332e]" },
        ].map((s, i) => (
          <Card key={i} className={`border-none shadow-sm ring-1 ring-slate-200 ${s.bg}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${s.color === 'text-white' ? 'opacity-70' : 'text-slate-400'}`}>{s.label}</p>
                <h3 className={`text-2xl font-black ${s.color === 'text-white' ? 'text-white' : 'text-slate-800'}`}>{s.val}</h3>
              </div>
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color === 'text-white' ? 'bg-white/10' : 'bg-slate-50'}`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            </CardContent>
          </Card>
        ))}
      </div>
 
      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search doctor name..." className="pl-9 h-10 bg-slate-50/50 border-slate-100" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <Select onValueChange={(val) => { setSpecialtyFilter(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-52 h-10 border-slate-200 font-medium text-slate-600">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {Array.from(new Set(doctors.map(d => d.specialization))).map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100">
                <TableHead className="font-black text-slate-800 uppercase text-[10px]">Doctor Info</TableHead>
                <TableHead className="font-black text-slate-800 uppercase text-[10px]">Specialization</TableHead>
                <TableHead className="font-black text-slate-800 uppercase text-[10px]">Status</TableHead>
                <TableHead className="font-black text-slate-800 uppercase text-[10px]">Email</TableHead>
                <TableHead className="font-black text-slate-800 uppercase text-[10px]">Experience</TableHead>
                <TableHead className="font-black text-slate-800 uppercase text-[10px] text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDoctors.map((doc) => (
                <TableRow key={doc._id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="font-bold text-slate-800">{doc.userId.name}</TableCell>
                  <TableCell><Badge variant="outline" className="font-bold text-blue-600 bg-blue-50/50 border-none text-[10px]">{doc.specialization}</Badge></TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">{doc.userId.email}</TableCell>
                  <TableCell className="font-bold text-slate-500 text-sm">{doc.experience} Years</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full" onClick={() => handleDelete(doc._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-slate-50/30 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Page {currentPage} of {totalPages || 1}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 px-3 font-bold text-xs" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}><ChevronLeft className="w-4 h-4 mr-1" /> Prev</Button>
            <Button variant="outline" size="sm" className="h-8 px-3 font-bold text-xs" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorManagement;