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
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    price: 5.99,
    category: "Pain Relief",
    image: "https://picsum.photos/400/400",
    description: "",
    uses: [],
    sideEffects: [],
  },
  {
    id: "2",
    name: "Vitamin C 1000mg",
    price: 12.50,
    category: "Vitamins & Supplements",
    image: "https://picsum.photos/400/401",
    description: "",
    uses: [],
    sideEffects: [],
  },
  {
    id: "3",
    name: "Antiseptic Wipes",
    price: 8.75,
    category: "First Aid",
    image: "https://picsum.photos/401/400",
    description: "",
    uses: [],
    sideEffects: [],
  },
  {
    id: "4",
    name: "Herbal Cough Syrup",
    price: 15.20,
    category: "Cold & Flu",
    image: "https://picsum.photos/401/401",
    description: "",
    uses: [],
    sideEffects: [],
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <Link href={`/pharmacy/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="product photo"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="text-lg font-headline font-semibold">{product.name}</h3>
        </CardContent>
      </Link>
      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button size="sm" className="bg-accent hover:bg-accent/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PharmacyPage() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Search for medicines and products..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pain-relief">Pain Relief</SelectItem>
                <SelectItem value="vitamins">Vitamins & Supplements</SelectItem>
                <SelectItem value="first-aid">First Aid</SelectItem>
                <SelectItem value="cold-flu">Cold & Flu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
