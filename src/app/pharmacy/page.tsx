'use client';
import Link from "next/link";
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
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useState, useEffect } from "react";
import { mockProducts } from "@/lib/mock-products";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <Link href={`/pharmacy/${product.id}`} className="block">
        <CardContent className="p-4 flex-grow">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="text-lg font-headline font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <Link href={`/pharmacy/${product.id}`}>
            <Button size="sm" variant="outline">Details</Button>
          </Link>
          <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    let products = mockProducts;

    if (selectedCategory !== "all") {
      products = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(products);
  }, [searchTerm, selectedCategory]);

  const categories = [
    "all",
    ...Array.from(new Set(mockProducts.map((p) => p.category))),
  ];

  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-6 space-y-4">
            <h1 className="text-3xl font-bold">Pharmacy</h1>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Search for medicines and products..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setSelectedCategory} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">Note: Prices are for demonstration purposes only and not reflective of live market rates.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}