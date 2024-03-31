import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Hotels",
  description:
    "Discover and book your perfect hotel with My Minute Travel. Our platform offers real-time hotels information, secure booking, and a seamless checkout process. Don’t miss out, book your dream trip now!",
};

export default function FlightsLayout({
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
