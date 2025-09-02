"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Doctor List (Common Data)
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Evelyn Reed",
    specialty: "Cardiology",
    location: "New York, NY",
    image: "https://source.unsplash.com/200x200/?doctor,1",
  },
  {
    id: 2,
    name: "Dr. Samuel Chen",
    specialty: "Dermatology",
    location: "San Francisco, CA",
    image: "https://source.unsplash.com/200x200/?doctor,2",
  },
  {
    id: 3,
    name: "Dr. Maria Garcia",
    specialty: "Pediatrics",
    location: "Miami, FL",
    image: "https://source.unsplash.com/200x200/?doctor,3",
  },
  {
    id: 4,
    name: "Dr. Raj Patel",
    specialty: "Orthopedics",
    location: "Chicago, IL",
    image: "https://source.unsplash.com/200x200/?doctor,4",
  },
  {
    id: 5,
    name: "Dr. Arjun Mehta",
    specialty: "Neurology",
    location: "Mumbai, India",
    image: "https://source.unsplash.com/200x200/?doctor,5",
  },
  {
    id: 6,
    name: "Dr. Priya Nair",
    specialty: "Gynecology",
    location: "Delhi, India",
    image: "https://source.unsplash.com/200x200/?doctor,6",
  },
];

export default function DoctorsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Find a Doctor</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold">{doc.name}</h2>
            <p className="text-sm text-gray-600">{doc.specialty}</p>
            <p className="text-sm text-gray-500">{doc.location}</p>

            <Link
              href={`/doctors/${doc.id}`}
              className="mt-3 text-blue-600 font-medium hover:underline"
            >
              Book Video Call
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
