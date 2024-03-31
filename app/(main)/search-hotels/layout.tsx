import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels",
  description:
    "Find the best hotels tailored to your needs with My Travel Platform! Explore flight options, compare prices, and book your ideal stay. Take the stress out of travel planning. Your perfect hotel is just a search away!",
};

export default function SearchFlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-[10vh]">{children}</div>;
}
