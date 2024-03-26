import SignUpForm from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/bg.webp')]">
      <div className="h-full absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <SignUpForm />
    </div>
  );
}
