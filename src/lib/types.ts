export type DoctorSpecialty = "Cardiology" | "Dermatology" | "Pediatrics" | "Orthopedics";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  icon: DoctorSpecialty;
  location: string;
  qualifications: string[];
  experience: string;
  reviews: { rating: number; count: number };
  availability: string[];
  image: string;
  availableTimes?: string[];
};

export type Product = {
  id: string;
  name:string;
  description: string;
  price: number;
  image: string;
  category: string;
  uses: string[];
  sideEffects: string[];
};

export type Appointment = {
    id: string;
    doctor: Doctor;
    date: string;
    time: string;
    status: "Upcoming" | "Completed" | "Cancelled";
}

export type Order = {
    id: string;
    items: Product[];
    date: string;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
}

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
