// src/app/doctors/page.tsx
"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Search, Heart, Droplets, Baby, Bone, Clock, Calendar } from "lucide-react";
import type { Doctor, DoctorSpecialty } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const SpecialtyIcons: Record<DoctorSpecialty, React.ElementType> = {
    Cardiology: Heart,
    Dermatology: Droplets,
    Pediatrics: Baby,
    Orthopedics: Bone
};

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    specialty: "Cardiology",
    icon: "Cardiology",
    location: "New York, NY",
    qualifications: ["MD", "FACC"],
    experience: "15 years",
    reviews: { rating: 4.9, count: 215 },
    availability: [],
    image: "https://picsum.photos/seed/person-1/400/400",
    availableTimes: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "2",
    name: "Dr. Samuel Chen",
    specialty: "Dermatology",
    icon: "Dermatology",
    location: "San Francisco, CA",
    qualifications: ["MD", "FAAD"],
    experience: "12 years",
    reviews: { rating: 4.8, count: 189 },
    availability: [],
    image: "https://picsum.photos/seed/person-2/400/401",
    availableTimes: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM"],
  },
  {
    id: "3",
    name: "Dr. Maria Garcia",
    specialty: "Pediatrics",
    icon: "Pediatrics",
    location: "Miami, FL",
    qualifications: ["MD", "FAAP"],
    experience: "20 years",
    reviews: { rating: 4.9, count: 320 },
    availability: [],
    image: "https://picsum.photos/seed/person-3/401/400",
    availableTimes: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM"],
  },
  {
    id: "4",
    name: "Dr. Ben Carter",
    specialty: "Orthopedics",
    icon: "Orthopedics",
    location: "Chicago, IL",
    qualifications: ["MD", "FAAOS"],
    experience: "18 years",
    reviews: { rating: 4.7, count: 150 },
    availability: [],
    image: "https://picsum.photos/seed/person-4/401/401",
    availableTimes: ["10:00 AM", "11:00 AM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
];

function DoctorCard({ doctor, onBookClick }: { doctor: Doctor; onBookClick: () => void; }) {
  const Icon = SpecialtyIcons[doctor.icon];
  return (
    <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
        <CardContent className="p-6 text-center flex-grow">
            <Link href={`/doctors/${doctor.id}`} className="block">
                <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={128}
                    height={128}
                    className="object-cover rounded-full mx-auto mb-4 border-4 border-background"
                    data-ai-hint="professional headshot person"
                />
                <h3 className="text-xl font-bold">{doctor.name}</h3>
            </Link>
            <div className="flex items-center justify-center text-sm text-primary font-semibold mt-1">
                {Icon && <Icon className="h-4 w-4 mr-1"/>}
                {doctor.specialty}
            </div>
             <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {doctor.location}
            </div>
             <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{doctor.reviews.rating}</span>
                <span className="text-muted-foreground">({doctor.reviews.count} reviews)</span>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
             <Button className="w-full bg-accent hover:bg-accent/90" onClick={onBookClick}>
                Book an Appointment
            </Button>
        </CardFooter>
      </Card>
  );
}

function BookingModal({ doctor, isOpen, onOpenChange }: { doctor: Doctor | null; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Reset state when modal is reopened or doctor changes
    if (isOpen) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
  }, [isOpen, doctor]);

  const handleBooking = () => {
    if (doctor && selectedDate && selectedTime) {
      console.log(`Booked appointment with ${doctor.name} on ${selectedDate.toDateString()} at ${selectedTime}`);
      onOpenChange(false);
      // Here you would typically show a confirmation toast or dialog
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
}

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const handleBookClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };
  
  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="flex flex-col w-full min-h-screen">
       <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-headline font-bold text-primary">Find a Doctor</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Search for specialists and book appointments with ease.
            </p>
        </div>

        <Card className="mb-8 p-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 items-center">
            <Input 
              placeholder="Search by name or location..." 
              className="lg:col-span-2" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select onValueChange={setSelectedSpecialty} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Dermatology">Dermatology</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
                <Search className="mr-2 h-4 w-4"/>
                Search
            </Button>
          </div>
        </Card>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onBookClick={() => handleBookClick(doctor)} />
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              No doctors found matching your criteria.
            </p>
          )}
        </div>

        <BookingModal
          doctor={selectedDoctor}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </main>
    </div>
  );
}
