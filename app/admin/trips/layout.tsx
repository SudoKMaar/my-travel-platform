import { Metadata } from "next";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { NextProvider } from "@/components/ui-provider";

export const metadata: Metadata = {
  title: "Trips",
  description: "Scraped Trips for My Travel Platform Dashboard",
};

export default function ScrapeDataDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextProvider>
      <section className="bg-[#f5f5fe]">
        <MobileHeader />
        <Sidebar className="hidden lg:flex" />
        <section className="flex-1 flex flex-col lg:pl-[256px] h-full pt-[50px] lg:pt-0">
          <div className="h-40 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3">
            <h3 className="text-5xl">Trips</h3>
            <p>Welcome to Scrapped Trips Info for My Travel Platform</p>
          </div>
          {children}
        </section>
      </section>
    </NextProvider>
  );
}
