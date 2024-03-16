"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";
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

const Navbar = () => {
  const pathname = usePathname();
  const { userInfo } = useAppStore();
  const routesWithImages = ["/", "/search-flights", "/search-hotels"];
  return (
    <div className="min-h-[10vh] w-full bg-[#0E1428] bg-opacity-25 text-white relative z-10">
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
      <div className="z-10 w-full flex items-center justify-around">
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
            Tours
          </Link>
          <Link
            href="/search-flights"
            className={
              pathname.includes("flights")
                ? "text-rose-500"
                : "text-white hover:text-rose-500 hover:underline"
            }
          >
            Flights
          </Link>
          <Link
            href="/search-hotels"
            className={
              pathname.includes("hotels")
                ? "text-rose-500"
                : "text-white hover:text-rose-500 hover:underline"
            }
          >
            Hotels
          </Link>
        </div>
        <div className="cursor-pointer flex flex-col items-center justify-end">
          {!userInfo && (
            <>
              <div className="hidden sm:flex">
                <Button
                  color="secondary"
                  variant="default"
                  className="text-white rounded-3xl bg-slate-600 hover:bg-rose-500"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  LogIn
                </Button>
              </div>
            </>
          )}
          {userInfo && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>User Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="h-14 gap-2">
                      <Link href="/profile">
                        <p className="font-semibold">Signed in as</p>
                        <p className="">{userInfo.email}</p>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/my-account">My Account </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/my-bookings">My Bookings </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/my-wishlists">My Wishlists </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/logout">Logout </Link>
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
