import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Admin SignIn portal for My Travel Platform",
};

export default function AdminSignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Toaster />
    </section>
  );
}
