import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Successful",
  description:
    "“Payment successful! Your dream journey awaits. Thank you for choosing our services for your flight, hotel, and trip bookings. Your adventure begins now!",
};

export default function SuccessLayout({
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
