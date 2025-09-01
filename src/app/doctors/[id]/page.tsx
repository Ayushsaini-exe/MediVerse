// src/app/doctors/[id]/page.tsx
"use client";

import Image from "next/image";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Award, Briefcase, MapPin, Calendar, Clock } from "lucide-react";
import type { Doctor } from "@/lib/types";
import { HeartPulse } from 'lucide-react';
import { CardiologyIcon } from "@/components/icons/cardiology-icon";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";


const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Evelyn Reed",
  specialty: "Cardiology",
  location: "New York, NY",
  qualifications: ["MD, Cornell University", "FACC"],
  experience: "15 years of experience in clinical cardiology, specializing in heart failure and preventative care.",
  reviews: { rating: 4.9, count: 215 },
  availability: ["2024-08-20", "2024-08-22", "2024-08-25"],
  image: "https://picsum.photos/seed/dr-reed/400/400",
};

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = mockDoctor;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  return (
    <div className="flex flex-col w-full font-pixel bg-[#E0F2FE] text-[#1E293B]">
      <Header title="Doctor Profile" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="rounded-none border-4 border-black shadow-[4px_4px_0px_#000] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10 text-black">
              <CardiologyIcon className="w-64 h-64" />
          </div>
          <CardContent className="p-6 relative z-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-black bg-white p-1">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full rounded-full"
                    data-ai-hint="professional headshot person"
                  />
                </div>
                <h2 className="mt-4 text-2xl font-bold">{doctor.name}</h2>
                <p className="text-primary font-semibold">{doctor.specialty}</p>
                <div className="flex items-center text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {doctor.location}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{doctor.reviews.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews.count})</span>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" /> Experience
                  </h3>
                  <p className="mt-2">{doctor.experience}</p>
                </div>
                <div className="border-t-4 border-black border-dotted my-4"></div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Qualifications
                  </h3>
                   <ul className="mt-2 space-y-1">
                    {doctor.qualifications.map((q, i) => <li className="flex items-center gap-2" key={i}><span>-</span>{q}</li>)}
                  </ul>
                </div>
                <div className="border-t-4 border-black border-dotted my-4"></div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                           <Calendar className="w-5 h-5 text-primary" /> Book Date
                        </h3>
                        <div className="mt-2 border-4 border-black p-2 bg-white">
                             {isMounted && <DayPicker 
                                mode="single"
                                className="!p-0"
                            />}
                        </div>
                    </div>
                    <div className="space-y-2">
                         <h3 className="text-lg fontsemibold flex items-center gap-2">
                           <Clock className="w-5 h-5 text-primary" /> Book Time
                        </h3>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {timeSlots.map(time => (
                                <Button key={time} variant="outline" className="rounded-none border-2 border-black bg-white hover:bg-yellow-200 active:bg-yellow-300 shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                                    {time}
                                </Button>
                            ))}
                        </div>
                         <Button className="w-full mt-4 rounded-none border-2 border-black bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                            Book Video Consultation
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
