'use client';

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col w-full p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
          <Link href="/pharmacy">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                        {item.image && <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-lg font-bold text-primary mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
                <Button size="lg" className="w-full">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full" onClick={() => clearCart()}>Clear Cart</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
