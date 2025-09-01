import Image from "next/image";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CheckCircle, AlertTriangle } from "lucide-react";
import type { Product } from "@/lib/types";

const mockProduct: Product = {
  id: "1",
  name: "Paracetamol 500mg Tablets",
  description: "Provides effective relief from mild to moderate pain including headache, migraine, toothache, and sore throat. Also helps to reduce fever.",
  price: 5.99,
  category: "Pain Relief",
  image: "https://picsum.photos/600/600",
  uses: [
    "Headache & Migraine",
    "Fever Reduction",
    "Toothache & Neuralgia",
    "Cold & Flu Symptoms",
  ],
  sideEffects: [
    "Allergic reactions",
    "Skin rashes",
    "Blood disorders (rare)",
    "Consult a doctor if symptoms persist",
  ]
};

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the product by params.id
  const product = mockProduct;

  return (
    <div className="flex flex-col w-full">
      <Header title="Product Details" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden border">
                   <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint="product bottle pills"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Badge variant="secondary">{product.category}</Badge>
                <h1 className="text-3xl font-headline font-bold">{product.name}</h1>
                <p className="text-muted-foreground">{product.description}</p>
                <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Separator className="my-6" />
                <div>
                   <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" /> Primary Uses
                  </h3>
                   <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1">
                    {product.uses.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>
                 <Separator className="my-6" />
                <div>
                   <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" /> Side Effects & Warnings
                  </h3>
                   <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1">
                    {product.sideEffects.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
