import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react";
import { fetchAllAppointments } from "../../Api/Management"; // API call

interface AppointmentData {
  _id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAppointments(); 
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    let color = "";
    switch (status) {
      case "confirmed":
        color = "bg-emerald-100 text-emerald-700";
        break;
      case "pending":
        color = "bg-amber-100 text-amber-700";
        break;
      case "completed":
        color = "bg-blue-100 text-blue-700";
        break;
      case "cancelled":
        color = "bg-rose-100 text-rose-700";
        break;
      default:
        color = "bg-gray-100 text-gray-700";
    }
    return <Badge className={`${color} font-bold`}>{status.toUpperCase()}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#06332e]" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>All scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Doctor Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell>{appt.patientName}</TableCell>
                  <TableCell>{appt.doctorName}</TableCell>
                  <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{getStatusBadge(appt.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;
