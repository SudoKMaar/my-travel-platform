import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flights",
  description:
    "Find the best flights tailored to your needs with My Travel Platform! Explore flight options, compare prices, and book your ideal journey. Take the stress out of travel planning. Your perfect flight is just a search away!",
};

export default function SearchFlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-[10vh]">{children}</div>;
}
