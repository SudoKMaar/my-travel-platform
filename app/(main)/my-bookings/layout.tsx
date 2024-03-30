import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings",
  description:
    "Discover your past adventures with My Travel Platform! Review your booked flights, hotels, and complete travel packages all in one place. Revisit your travel history and plan your next journey with us. Your adventure diary awaits!",
};

export default function MyBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-[10vh]">{children}</div>;
}
