// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function StripeForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          toast({
            title: "Payment succeeded!",
          });
          break;
        case "processing":
          setMessage("Your payment is processing.");
          toast({
            title: "Your payment is processing.",
          });
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          toast({
            variant: "destructive",
            title: "Your payment was not successful, please try again.",
          });
          break;
        default:
          setMessage("Something went wrong.");
          toast({
            variant: "destructive",
            title: "Something went wrong.",
          });
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    } else {
      setMessage("An unexpected error occurred.");
      toast({
        variant: "destructive",
        title: "An unexpected error occurred.",
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <form id="payment-form" onSubmit={handleSubmit} className="w-96">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md mt-5 w-full"
        >
          <span id="button-text">
            {isLoading ? (
              <div
                className="spinner flex flex-row justify-center items-center"
                id="spinner"
              >
                <Loader2 className="animate-spin mr-2" size={20} />
                <span> Processing</span>
              </div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
