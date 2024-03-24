import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Exlore all the trips specially picked for you by My Travel Platform",
};

export default function TripsLayout({
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
