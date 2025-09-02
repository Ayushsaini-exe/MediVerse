// src/app/doctors/[id]/page.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award, Briefcase, MapPin, Calendar, Clock } from "lucide-react";
import type { Appointment, Doctor } from "@/lib/types";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";

const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Evelyn Reed",
  specialty: "Cardiology",
  icon: "Cardiology",
  slug: "dr-evelyn-reed",
  location: "New York, NY",
  qualifications: ["MD, Cornell University", "FACC"],
  experience: "15 years of experience in clinical cardiology, specializing in heart failure and preventative care.",
  reviews: { rating: 4.9, count: 215 },
  availability: ["2024-08-20", "2024-08-22", "2024-08-25"],
  image: "https://picsum.photos/seed/dr-reed/400/400",
  availableTimes: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
};

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = mockDoctor;
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isBookingOpen) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
  }, [isBookingOpen]);
  
  const handleBookingTrigger = () => {
    if (!user) {
      router.push("/login");
    } else {
      setIsBookingOpen(true);
    }
  };


  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        id: `appt_${Date.now()}`,
        doctor: doctor,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: "Upcoming",
      };

      const existingAppointments = JSON.parse(sessionStorage.getItem("user-appointments") || "[]");
      sessionStorage.setItem("user-appointments", JSON.stringify([...existingAppointments, newAppointment]));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment with ${doctor.name} is set for ${selectedDate.toDateString()} at ${selectedTime}.`,
      });

      setIsBookingOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <AvatarImage src={`https://picsum.photos/seed/${doctor.slug}/400/400`} alt={doctor.name} />
                <h2 className="mt-4 text-2xl font-bold">{doctor.name}</h2>
                <p className="text-primary font-semibold">{doctor.specialty}</p>
                <div className="flex items-center text-sm mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {doctor.location}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{doctor.reviews.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews.count} reviews)</span>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" /> About
                  </h3>
                  <p className="mt-2 text-muted-foreground">{doctor.experience}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Qualifications
                  </h3>
                   <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                    {doctor.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>

                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                     <Button className="w-full !bg-accent hover:!bg-accent/90" onClick={handleBookingTrigger}>
                        Book Video Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-headline">Book Appointment</DialogTitle>
                      <DialogDescription>
                        Schedule a video consultation with {doctor.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 md:grid-cols-2 py-4">
                      <div>
                        <h3 className="text-md font-semibold flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-primary" /> Select Date
                        </h3>
                        <div className="p-0 rounded-md border">
                          {isMounted && <DayPicker 
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="!m-0"
                            disabled={{ before: new Date() }}
                          />}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-md font-semibold flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-primary" /> Select Time
                        </h3>
                        {selectedDate ? (
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            {doctor.availableTimes?.map(time => (
                              <Button 
                                key={time} 
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground pt-2">Please select a date to see available times.</p>
                        )}
                        <Button 
                          className="w-full mt-4 !bg-accent hover:!bg-accent/90"
                          disabled={!selectedDate || !selectedTime}
                          onClick={handleBooking}
                        >
                          Confirm Booking for {selectedTime}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-40 w-40">
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        className="rounded-full object-cover border-4 border-card"
        data-ai-hint="professional headshot person"
      />
    </div>
  );
}
