"use client";
import React, { useState } from "react";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SignInSchema = z.object({
  email: z.string().email({
    message: "Valid email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const AdminLoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setIsSubmitting(true);
    //handle submit
    setIsSubmitting(false);
  };
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/bg.webp')]">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <Card className="w-full bg-white bg-opacity-20 md:w-[480px] shadow-2xl z-10">
        <CardHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
          <div className="w-full flex flex-col gap-y-1 items-center justify-center">
            <Link href="/" className="flex flex-col items-center">
              <Image
                src="/logo.webp"
                alt="MTP Logo"
                height={80}
                width={80}
                className="cursor-pointer"
              />
              <h1 className="text-2xl sm:text-3xl uppercase font-medium italic text-white text-center">
                My Travel Platform
              </h1>
            </Link>
            <p className="text-white/80 text-sm sm:text-xl">Admin Login</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="name@domain.com"
                          type="email"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="••••••••"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    {"Signing in..."}
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="flex items-center">
            <p className="text-white/60 text-xs">
              Dont&apos;t have an account yet?
            </p>
            <Button variant="link" className="p-0 pl-1.5" size="sm" asChild>
              <Link href="/admin/sign-up" className="text-white">
                Sign up
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
