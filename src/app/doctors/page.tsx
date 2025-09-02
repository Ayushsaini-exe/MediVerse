// src/app/doctors/page.tsx
"use client"

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Star, MapPin, Search, Heart, Droplets, Baby, Bone } from "lucide-react";
import type { Doctor, DoctorSpecialty } from "@/lib/types";

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
  },
];

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const Icon = SpecialtyIcons[doctor.icon];
  return (
    <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <CardContent className="p-6 text-center">
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
             <Button className="w-full bg-accent hover:bg-accent/90">
                Book an Appointment
            </Button>
        </CardFooter>
      </Card>
  );
}

export default function DoctorsPage() {
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
            <Input placeholder="Search by name or location..." className="lg:col-span-2" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
                <Search className="mr-2 h-4 w-4"/>
                Search
            </Button>
          </div>
        </Card>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>
    </div>
  );
}
