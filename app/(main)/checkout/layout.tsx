import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Almost there! Securely finalize your flight, hotel, and trip bookings in just a few clicks. Our checkout process is quick, easy, and user-friendly. Book now!",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[10vh]">
      <Suspense fallback="">{children}</Suspense>
    </div>
  );
}
