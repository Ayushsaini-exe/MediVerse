// src/app/doctors/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import type { Doctor } from "@/lib/types";

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    specialty: "Cardiology",
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
    location: "Chicago, IL",
    qualifications: ["MD", "FAAOS"],
    experience: "18 years",
    reviews: { rating: 4.7, count: 150 },
    availability: [],
    image: "https://picsum.photos/seed/person-4/401/401",
  },
];

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={`/doctors/${doctor.id}`} className="block h-full">
      <Card className="h-full flex flex-col rounded-none border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 bg-white">
        <CardHeader className="p-0 border-b-4 border-black">
          <div className="relative h-48 w-full bg-blue-200">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
              data-ai-hint="professional headshot person"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="rounded-none border-2 border-black !text-black bg-yellow-300">{doctor.specialty}</Badge>
          <h3 className="text-xl font-bold mt-2">{doctor.name}</h3>
          <div className="flex items-center text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {doctor.location}
          </div>
        </CardContent>
        <CardFooter className="p-4 mt-auto border-t-4 border-black border-dotted flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold">{doctor.reviews.rating}</span>
            <span className="text-slate-600">({doctor.reviews.count})</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function DoctorsPage() {
  return (
    <div className="flex flex-col w-full font-pixel bg-[#E0F2FE] min-h-screen">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="mb-6 rounded-none border-4 border-black shadow-[4px_4px_0px_#000] p-4 bg-white">
          <div className="grid gap-4 md:grid-cols-3">
            <Input placeholder="Search by name..." className="rounded-none border-2 border-black" />
            <Select>
              <SelectTrigger className="rounded-none border-2 border-black">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent className="font-pixel rounded-none border-2 border-black bg-white">
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Filter by location..." className="rounded-none border-2 border-black" />
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
