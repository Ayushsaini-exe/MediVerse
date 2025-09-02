"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

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
    name: "Dr. Priya Sharma",
    specialty: "Gynecology",
    location: "Delhi, India",
    image: "https://source.unsplash.com/200x200/?doctor,6",
  },
  {
    id: 7,
    name: "Dr. Rohan Iyer",
    specialty: "Pediatrics",
    location: "Bangalore, India",
    image: "https://source.unsplash.com/200x200/?doctor,7",
  },
  {
    id: 8,
    name: "Dr. Neha Kapoor",
    specialty: "Dentistry",
    location: "Hyderabad, India",
    image: "https://source.unsplash.com/200x200/?doctor,8",
  },
  {
    id: 9,
    name: "Dr. Ankit Verma",
    specialty: "Cardiology",
    location: "Kolkata, India",
    image: "https://source.unsplash.com/200x200/?doctor,9",
  },
  {
    id: 10,
    name: "Dr. Shreya Nair",
    specialty: "Dermatology",
    location: "Chennai, India",
    image: "https://source.unsplash.com/200x200/?doctor,10",
  },
];


export default function DoctorDetailPage() {
  const params = useParams();
  const doctorId = Number(params.id);
  const doctor = mockDoctors.find((d) => d.id === doctorId);

  const [appointment, setAppointment] = useState({ date: "", time: "" });

  const handleBook = () => {
    console.log("Appointment Booked:", {
      doctor: doctor?.name,
      ...appointment,
    });
    alert(`Appointment booked with ${doctor?.name} on ${appointment.date} at ${appointment.time}`);
  };

  if (!doctor) {
    return <p className="text-center text-red-500">Doctor not found!</p>;
  }

  return (
    <div className="px-6 md:px-20 py-10">
      {/* Doctor Info */}
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-lg mx-auto">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{doctor.name}</h2>
        <p className="text-blue-600 font-medium">{doctor.specialty}</p>
        <p className="text-gray-500">{doctor.location}</p>
      </div>

      {/* Appointment Form */}
      <div className="bg-gray-50 shadow-md rounded-lg p-8 mt-8 max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Book a Video Call Appointment
        </h3>

        <label className="block mb-2 text-sm">Choose Date</label>
        <input
          type="date"
          value={appointment.date}
          onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
        />

        <label className="block mb-2 text-sm">Choose Time</label>
        <input
          type="time"
          value={appointment.time}
          onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md w-full mb-6"
        />

        {/* Changed button color to same as Login (blue) */}
        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Video Call
        </button>
      </div>
    </div>
  );
}