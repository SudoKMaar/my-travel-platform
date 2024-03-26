"use client";
import React, { useState } from "react";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { AUTH_API_ROUTES } from "@/routes";
import { useAppStore } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import { SignInButton } from "@/components/signin-button";
import { ToastAction } from "./ui/toast";

const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Valid email is required.",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters required.",
    }),
    confirm: z.string().min(8, {
      message: "Minimum 8 characters required.",
    }),
    firstName: z.string().min(1, {
      message: "First Name is required.",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords does not match.",
    path: ["confirm"],
  });

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setUserInfo } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(AUTH_API_ROUTES.SIGN_UP, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      if (response.data.userInfo) {
        setUserInfo(response.data.userInfo);
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast({
              variant: "destructive",
              title: "Name, Email and Password Required.",
              description: "All field are required",
            });
            break;
          case 409:
            toast({
              variant: "destructive",
              title: "User already exists",
              description:
                "Try login into existing account or use another email",
              action: (
                <Link href="/auth/sign-in">
                  <ToastAction altText="LogIn">LogIn</ToastAction>
                </Link>
              ),
            });
            break;
          default:
            toast({
              variant: "destructive",
              title: "Error",
              description: "An unexpected error occurred.",
            });
        }
      } else if (error.request) {
        toast({
          variant: "destructive",
          title: "No Response",
          description: "The request was made but no response was received.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    }
    setIsSubmitting(false);
  };

  return (
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
          <p className="text-white/80 text-sm sm:text-xl">Create Account</p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="John"
                        type="text"
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Doe"
                        type="text"
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {"Creating Account..."}
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <div className="flex items-center">
          <p className="text-white/60 text-xs">Already have an account?</p>
          <SignInButton mode="redirect" asChild>
            <Button variant="link" className="p-0 pl-1.5" size="sm">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
