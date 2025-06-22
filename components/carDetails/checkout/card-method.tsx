import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CardMethod({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round(amount * factor);
  }

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
      });

      const data = await res.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        toast.error("Failed to retrieve client secret.");
        setLoading(false);
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        toast.error(submitError.message);
        setLoading(false);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        console.log("Payment initiated successfully. Redirecting...");
      }
    } catch (err: unknown) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PaymentElement />
      <Button
        onClick={() => handleSubmit()}
        disabled={!stripe || loading}
        className="w-full mt-5"
      >
        {!loading
          ? `Pay ${amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`
          : "Processing..."}
      </Button>
    </div>
  );
}
