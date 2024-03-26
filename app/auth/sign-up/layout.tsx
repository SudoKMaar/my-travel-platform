import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "User Account Creation portal for My Travel Platform",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
