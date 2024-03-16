import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function MTPHomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col">
      <main className="flex flex-col relative">
        <Navbar />
        <section className=" h-full flex-1 ">{children}</section>
        <Footer />
      </main>
    </section>
  );
}
