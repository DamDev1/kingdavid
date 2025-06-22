import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardMethod from "./card-method";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FinanceMethod from "./finance-method";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;

const stripePromise = loadStripe(PUBLIC_KEY);
export default function MethodOfPayment() {
  return (
    <div className="mt-5">
      <Tabs defaultValue="card" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>
        <TabsContent value="card">
          <div className="grid gap-5 mt-5">
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <div>
                <Label>Firstname</Label>
                <Input className="mt-2" type="text" placeholder="John" />
              </div>
              <div>
                <Label>Lastname<span className="text-xs text-gray-400">(optional)</span></Label>
                <Input className="mt-2" type="text" placeholder="John" />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-2" type="text" placeholder="John" />
              </div>
              <div>
                <Label>Phone<span className="text-xs text-gray-400">(optional)</span></Label>
                <Input className="mt-2" type="text" placeholder="John" />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Textarea className="mt-2" placeholder="John" />
              </div>
            </div>
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(1000),
                currency: "usd",
              }}
            >
              <CardMethod amount={1000} />
            </Elements>
          </div>
        </TabsContent>
        <TabsContent value="finance">
          <FinanceMethod />
        </TabsContent>
      </Tabs>
    </div>
  );
}
