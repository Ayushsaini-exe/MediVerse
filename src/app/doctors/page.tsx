import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
    image: "https://picsum.photos/400/400",
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
    image: "https://picsum.photos/400/401",
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
    image: "https://picsum.photos/401/400",
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
    image: "https://picsum.photos/401/401",
  },
];

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={`/doctors/${doctor.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
              data-ai-hint="professional headshot"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{doctor.specialty}</Badge>
          <h3 className="text-lg font-headline font-semibold">{doctor.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {doctor.location}
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-muted/50 flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span className="font-bold">{doctor.reviews.rating}</span>
            <span className="text-muted-foreground">({doctor.reviews.count} reviews)</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function DoctorsPage() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Find a Doctor" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Input placeholder="Search by doctor name..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Filter by location..." />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>
    </div>
  );
}
