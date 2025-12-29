import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle, 
  CreditCard,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const UserAppointments = () => { 
  const [activeTab, setActiveTab] = useState("upcoming"); 

  const appointmentsData = {
    upcoming: [
      { id: 1, doctor: "Dr. Sarah Wilson", specialty: "Cardiologist", date: "Dec 30, 2024", time: "10:30 AM", type: "In-Person", location: "MediCare Hospital, Room 204", status: "confirmed", image: "SW" },
      { id: 2, doctor: "Dr. Michael Brown", specialty: "Neurologist", date: "Jan 2, 2025", time: "2:00 PM", type: "Video Call", location: "Online Consultation", status: "confirmed", image: "MB" },
    ],
    past: [
      { id: 4, doctor: "Dr. Robert Taylor", specialty: "Orthopedic", date: "Dec 20, 2024", time: "9:00 AM", type: "In-Person", location: "MediCare Hospital, Room 105", status: "completed", image: "RT" },
    ],
    cancelled: [
      { id: 6, doctor: "Dr. James Martinez", specialty: "Ophthalmologist", date: "Dec 18, 2024", time: "1:00 PM", type: "In-Person", location: "MediCare Hospital, Room 202", status: "cancelled", image: "JM" },
    ],
  };

  const bookingHistory = [
    { id: "BK-9921", doctor: "Dr. Sarah Wilson", date: "24 Dec 2024", amount: "₹500", method: "UPI", status: "Paid" },
    { id: "BK-8842", doctor: "Dr. Robert Taylor", date: "20 Dec 2024", amount: "₹800", method: "Card", status: "Paid" },
    { id: "BK-7712", doctor: "Dr. Lisa Anderson", date: "15 Dec 2024", amount: "₹450", method: "Wallet", status: "Refunded" },
    { id: "BK-6610", doctor: "Dr. Michael Brown", date: "10 Dec 2024", amount: "₹600", method: "UPI", status: "Paid" },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen space-y-6 text-left">
       
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none mb-2">My Medical Desk</h1>
          <p className="text-slate-500 font-medium">View appointments and booking transactions.</p>
        </div>
         
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Spent", val: "₹2,350", color: "text-blue-600", bg: "bg-blue-50", icon: CreditCard },
          { label: "Upcoming", val: appointmentsData.upcoming.length, color: "text-emerald-600", bg: "bg-emerald-50", icon: Clock },
          { label: "Completed", val: appointmentsData.past.length, color: "text-indigo-600", bg: "bg-indigo-50", icon: CheckCircle },
          { label: "Cancelled", val: appointmentsData.cancelled.length, color: "text-rose-600", bg: "bg-rose-50", icon: XCircle },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
              </div>
              <div className={`h-10 w-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
 
      <div className="flex flex-wrap bg-white p-1.5 rounded-2xl ring-1 ring-slate-200 shadow-sm w-full sm:w-fit">
        {["upcoming", "past", "cancelled", "my bookings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${
              activeTab === tab ? "bg-[#06332e] text-white shadow-md" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
 
      <div className="grid grid-cols-1 gap-6">
        {activeTab === "my bookings" ? ( 
          <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-lg font-black text-slate-800">Transaction History</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100">
                  <TableHead className="font-bold uppercase text-[10px]">Booking ID</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Doctor / Consultation</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Date</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Method</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Amount</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Status</TableHead>
                  <TableHead className="font-bold uppercase text-[10px] text-right pr-6">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingHistory.map((item) => (
                  <TableRow key={item.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <TableCell className="font-mono text-[11px] text-slate-500">{item.id}</TableCell>
                    <TableCell className="font-bold text-slate-800 text-sm">{item.doctor}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{item.date}</TableCell>
                    <TableCell className="text-slate-500 text-xs font-medium">{item.method}</TableCell>
                    <TableCell className="font-black text-slate-900 text-sm">{item.amount}</TableCell>
                    <TableCell>
                      <Badge className={`border-none text-[10px] font-bold ${item.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-[#06332e]">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : ( 
          <div className="space-y-4 max-w-4xl">
            {appointmentsData[activeTab as keyof typeof appointmentsData]?.map((app) => (
              <Card key={app.id} className="border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden group hover:ring-[#f7a582]/50 transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row gap-5 items-center">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#06332e] font-black border border-slate-100  shrink-0">
                      {app.image}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <h4 className="font-black text-slate-800">{app.doctor}</h4>
                        <Badge className="w-fit mx-auto md:mx-0 bg-blue-50 text-blue-600 border-none text-[10px] uppercase font-bold tracking-tight">{app.specialty}</Badge>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#f7a582]" /> {app.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#f7a582]" /> {app.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#f7a582]" /> {app.type}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-fit">
                      <Button size="sm" className="flex-1 md:flex-none bg-[#06332e] text-[11px] font-bold h-9 rounded-lg">View Details</Button>
                      <Button size="sm" variant="outline" className="flex-1 md:flex-none border-slate-200 text-[11px] font-bold h-9 rounded-lg">Action</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Appointments Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAppointments;