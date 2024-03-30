"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  AppWindowIcon,
  BusFront,
  ClipboardList,
  Hotel,
  LogIn,
  LogOut,
  Menu,
  Plane,
  TicketCheck,
  UserCog,
  Users,
} from "lucide-react";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignInButton } from "@/components/signin-button";

const Navbar = () => {
  const pathname = usePathname();
  const { userInfo } = useAppStore();
  const routesWithImages = ["/", "/search-flights", "/search-hotels"];
  return (
    <div className="min-h-[10vh] w-full bg-[#0E1428] bg-opacity-25 text-white fixed z-10">
      {!routesWithImages.includes(pathname) && (
        <>
          <div className="fixed left-0 top-0 h-[10vh] w-[100vw] overflow-hidden z-0">
            <div className="h-[70vh] w-[100vw] absolute z-10 top-0 left-0">
              <Image
                src="/bg.webp"
                layout="fill"
                objectFit="cover"
                alt="Search"
              />
            </div>
          </div>
          <div
            className="fixed left-0 top-0 h-[10vh] w-[100vw] overflow-hidden z-0"
            style={{
              backdropFilter: "blur(12px) saturate(280%)",
              WebkitBackdropFilter: "blur(12px) saturate(280%)",
            }}
          ></div>
        </>
      )}
      <div className="fixed z-10 w-full flex items-center justify-around">
        <div className="cursor-pointer flex flex-col items-center justify-start">
          <Link href="/">
            <div className="flex flex-row text-center">
              <Image
                src="/logo.webp"
                alt="My Travel Platform Logo"
                height={60}
                width={60}
              />
              <h1 className="sm:text-xl text-3xl uppercase font-medium italic text-center items-center justify-center my-auto pl-2">
                My Travel Platform
              </h1>
            </div>
          </Link>
        </div>
        <div className="hidden sm:flex gap-4 justify-center">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-rose-500"
                : "text-white hover:text-rose-500 hover:underline"
            }
          >
            <div className="flex flex-col md:flex-row items-center justify-center">
              <BusFront />
              Tours
            </div>
          </Link>
          <Link
            href="/search-flights"
            className={
              pathname.includes("flights")
                ? "text-rose-500"
                : "text-white hover:text-rose-500 hover:underline"
            }
          >
            <div className="flex flex-col md:flex-row items-center justify-center">
              <Plane />
              Flights
            </div>
          </Link>
          <Link
            href="/search-hotels"
            className={
              pathname.includes("hotels")
                ? "text-rose-500"
                : "text-white hover:text-rose-500 hover:underline"
            }
          >
            <div className="flex flex-col md:flex-row items-center justify-center">
              <Hotel />
              Hotels
            </div>
          </Link>
        </div>
        <div className="cursor-pointer flex flex-col items-center justify-end">
          {!userInfo && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="sm:hidden" asChild>
                  <Menu className="w-10 h-10 text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-black border-black">
                  <DropdownMenuLabel>
                    <div className="flex flex-row">
                      <AppWindowIcon className="w-5 h-5 mr-1" />
                      User Menu
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-black" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/">
                        <div className="flex flex-row">
                          <BusFront className="w-5 h-5 mr-1" />
                          Tours
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/search-flights">
                        <div className="flex flex-row">
                          <Plane className="w-5 h-5 mr-1" />
                          Flights
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/search-hotels">
                        <div className="flex flex-row">
                          <Hotel className="w-5 h-5 mr-1" />
                          Hotels
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-black" />
                  <DropdownMenuItem>
                    <Link href="/auth/sign-in">
                      <div className="flex flex-row">
                        <LogIn className="w-5 h-5 mr-1" />
                        Log In
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="hidden sm:flex">
                <SignInButton mode="modal" asChild>
                  <Button
                    color="secondary"
                    variant="default"
                    className="text-white rounded-3xl bg-rose-500 hover:bg-rose-600"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    LogIn
                  </Button>
                </SignInButton>
              </div>
            </>
          )}
          {userInfo && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="bg-black">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User Profile Picture"
                    />
                    <AvatarFallback>MTP</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-black border-black">
                  <DropdownMenuLabel>
                    <div className="flex flex-row">
                      <Users className="w-5 h-5 mr-1" />
                      User Profile
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-black" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="h-14 gap-2">
                      <Link href="/profile">
                        <p className="font-semibold">Signed in as</p>
                        <p className="">{userInfo.email}</p>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-black" />
                  <DropdownMenuGroup className="sm:hidden">
                    <DropdownMenuItem>
                      <Link href="/">
                        <div className="flex flex-row">
                          <BusFront className="w-5 h-5 mr-1" />
                          Tours
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/search-flights">
                        <div className="flex flex-row">
                          <Plane className="w-5 h-5 mr-1" />
                          Flights
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/search-hotels">
                        <div className="flex flex-row">
                          <Hotel className="w-5 h-5 mr-1" />
                          Hotels
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="sm:hidden bg-black" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/my-account">
                        <div className="flex flex-row">
                          <UserCog className="w-5 h-5 mr-1" />
                          My Account
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/my-bookings">
                        <div className="flex flex-row">
                          <TicketCheck className="w-5 h-5 mr-1" />
                          My Bookings
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/my-wishlists">
                        <div className="flex flex-row">
                          <ClipboardList className="w-5 h-5 mr-1" />
                          My Wishlists
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-black" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/logout">
                        <div className="flex flex-row">
                          <LogOut className="w-5 h-5 mr-1" />
                          Logout
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
