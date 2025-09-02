// src/app/profile/page.tsx
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar, CheckCircle, Truck, Package } from "lucide-react";
import type { Appointment, Order } from "@/lib/types";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const mockAppointments: Appointment[] = [
  {
    id: "appt_completed_1",
    doctor: { id: "2", slug: "dr-samuel-chen", name: "Dr. Samuel Chen", specialty: "Dermatology", image: "", location: "New York, NY", qualifications:[], experience:"", reviews:{rating:0,count:0}, availability:[], icon: "Dermatology" },
    date: "2024-07-15",
    time: "02:30 PM",
    status: "Completed",
  },
];

const mockOrders: Order[] = [
    { id: "ORD001", items: [{id:"1", name: "Paracetamol", price: 5.99, image: "https://picsum.photos/102/102", category:"", description:"", uses:[], sideEffects:[]}], date: "2024-07-28", total: 5.99, status: "Delivered" },
    { id: "ORD002", items: [{id:"2", name: "Vitamin C", price: 12.50, image: "https://picsum.photos/103/103", category:"", description:"", uses:[], sideEffects:[]}, {id:"3", name: "Antiseptic Wipes", price: 8.75, image: "https://picsum.photos/104/104", category:"", description:"", uses:[], sideEffects:[]}], date: "2024-08-02", total: 21.25, status: "Shipped" },
];

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    // on mount, load appointments from session storage
    const storedAppointments = JSON.parse(sessionStorage.getItem("user-appointments") || "[]");
    const allAppointments = [...mockAppointments, ...storedAppointments];
    // sort by date
    allAppointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setAppointments(allAppointments);
  }, []);

  if (loading || !user) {
    return (
      <div className="flex flex-col w-full">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Card>
                <CardHeader className="flex-row items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-5 w-48" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-96 w-full" />
                </CardContent>
            </Card>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://picsum.photos/seed/${user.id}/200/200`} data-ai-hint="person" />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
              <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-1 text-muted-foreground mt-1">
                 <div className="flex items-center gap-2"><Mail className="w-4 h-4"/>{user.email}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
              </TabsList>
              <TabsContent value="appointments" className="pt-4">
                 <div className="space-y-4">
                    {appointments.map(appt => (
                        <Card key={appt.id}>
                            <CardContent className="p-4 flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                   <Avatar className="h-12 w-12"><AvatarImage src={`https://picsum.photos/seed/${appt.doctor.slug}/100/100`} data-ai-hint="doctor headshot"/></Avatar>
                                   <div>
                                       <p className="font-semibold">{appt.doctor.name}</p>
                                       <p className="text-sm text-muted-foreground">{appt.doctor.specialty}</p>
                                   </div>
                               </div>
                                <div className="text-sm text-muted-foreground text-right">
                                    <p>{new Date(appt.date).toDateString()}</p>
                                    <p>{appt.time}</p>
                                </div>
                                <div className={`text-sm font-semibold flex items-center gap-2 ${appt.status === "Completed" ? "text-green-600" : appt.status === "Cancelled" ? "text-red-600" : "text-blue-600"}`}>
                                    {appt.status === "Completed" ? <CheckCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                                    {appt.status}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
              </TabsContent>
              <TabsContent value="orders" className="pt-4">
                 <div className="space-y-4">
                    {mockOrders.map(order => (
                        <Card key={order.id}>
                           <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Order ID: {order.id}</p>
                                    <p className="text-sm text-muted-foreground">Date: {new Date(order.date).toDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-lg text-primary">${order.total.toFixed(2)}</p>
                                    <div className={`text-sm font-semibold flex items-center gap-2 justify-end ${order.status === "Delivered" ? "text-green-600" : "text-amber-600"}`}>
                                        {order.status === "Delivered" ? <Package className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                           </CardHeader>
                           <CardContent>
                              <div className="space-y-2">
                                {order.items.map(item => (
                                  <div key={item.id} className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" />
                                    <p>{item.name}</p>
                                    <p className="ml-auto font-medium">${item.price.toFixed(2)}</p>
                                  </div>
                                ))}
                              </div>
                           </CardContent>
                        </Card>
                    ))}
                 </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
