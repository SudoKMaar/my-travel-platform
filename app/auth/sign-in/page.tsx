import SignInForm from "@/components/signin-form";

export default function SignInPage() {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/bg.webp')]">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <SignInForm />
    </div>
  );
}
