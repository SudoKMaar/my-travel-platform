import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "SignIn portal for My Travel Platform",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
