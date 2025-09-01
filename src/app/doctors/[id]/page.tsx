import Image from "next/image";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Star, Award, Briefcase, MapPin } from "lucide-react";
import type { Doctor } from "@/lib/types";

const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Evelyn Reed",
  specialty: "Cardiology",
  location: "New York, NY",
  qualifications: ["MD, Cornell University", "Fellow of the American College of Cardiology (FACC)"],
  experience: "15 years of experience in clinical cardiology, specializing in heart failure and preventative care.",
  reviews: { rating: 4.9, count: 215 },
  availability: ["2024-08-20", "2024-08-22", "2024-08-25"],
  image: "https://picsum.photos/400/400",
};

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the doctor by params.id
  const doctor = mockDoctor;

  return (
    <div className="flex flex-col w-full">
      <Header title="Doctor Profile" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    data-ai-hint="professional headshot"
                  />
                </div>
                <h2 className="mt-4 text-2xl font-headline font-bold">{doctor.name}</h2>
                <p className="text-accent font-semibold">{doctor.specialty}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {doctor.location}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                  <span className="font-bold">{doctor.reviews.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews.count} reviews)</span>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" /> Experience
                  </h3>
                  <p className="mt-2 text-muted-foreground">{doctor.experience}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Qualifications
                  </h3>
                  <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1">
                    {doctor.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>
                <Separator />
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                            Book an Appointment
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">Select an available date.</p>
                        <Calendar 
                            mode="single"
                            className="mt-4 rounded-md border"
                        />
                    </div>
                    <div className="space-y-2">
                         <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                            Available Times
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">Choose a time slot for your video consultation.</p>
                        <div className="grid grid-cols-2 gap-2 pt-4">
                            <Button variant="outline">09:00 AM</Button>
                            <Button variant="outline">10:00 AM</Button>
                            <Button variant="outline">11:00 AM</Button>
                            <Button variant="outline">02:00 PM</Button>
                            <Button variant="outline">03:00 PM</Button>
                            <Button variant="outline">04:00 PM</Button>
                        </div>
                         <Button className="w-full mt-4 bg-accent hover:bg-accent/90">
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
