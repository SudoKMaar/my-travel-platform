import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer
      className="min-h-[20vh] px-8 pt-5 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/bg.webp")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <div className="relative z-10 p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-white">
        <div className="justify-center items-center mx-auto col-span-1 sm:col-span-2 md:col-span-1">
          <Link href="/">
            <div className="cursor-pointer flex flex-col justify-center items-center mx-auto">
              <Image
                src="/logo.webp"
                alt="My Travel Platform logo"
                height={80}
                width={80}
              />
              <span className="text-xl sm:text-3xl text-center uppercase font-medium italic mx-auto">
                My Travel Platform
              </span>
            </div>
          </Link>
          <p className="text-center">
            Revolutionizes your travel experience with our all-in-one travel
            app. Effortlessly discover, compare, and book flights, hotels, and
            tours for your next adventure.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 justify-center items-center mx-auto col-span-1">
          <h3 className="text-3xl font-medium text-rose-500">Destinations</h3>
          <ul className="flex flex-col gap-1 justify-between text-center">
            <li className="cursor-pointer hover:text-rose-500">India</li>
            <li className="cursor-pointer hover:text-rose-500">Dubai</li>
            <li className="cursor-pointer hover:text-rose-500">France</li>
            <li className="cursor-pointer hover:text-rose-500">Australia</li>
            <li className="cursor-pointer hover:text-rose-500">Maldives</li>
            <li className="cursor-pointer hover:text-rose-500">Italy</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-4 justify-center items-center mx-auto col-span-1">
          <h3 className="text-3xl font-medium text-rose-500">Adventures</h3>
          <ul className="flex flex-col gap-1 justify-between text-center">
            <li className="cursor-pointer hover:text-rose-500">Extreme</li>
            <li className="cursor-pointer hover:text-rose-500">Aerial</li>
            <li className="cursor-pointer hover:text-rose-500">
              Nature and Wildlife
            </li>
            <li className="cursor-pointer hover:text-rose-500">
              Winter Sports
            </li>
            <li className="cursor-pointer hover:text-rose-500">
              Outdoor Parks
            </li>
            <li className="cursor-pointer hover:text-rose-500">Water Sports</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-4 justify-center items-center mx-auto col-span-1 sm:col-span-2 md:col-span-1">
          <h3 className="text-3xl font-medium text-rose-500 text-center">
            Get in Touch
          </h3>
          <ul className="flex gap-5 mt-5 flex-row md:flex-col">
            <Link href="https://www.facebook.com/AbhishekKMaar">
              <li className="bg-rose-500 bg-opacity-10 rounded-lg text-rose-500 text-3xl p-3 cursor-pointer hover:bg-opacity-30 transition-all duration-300">
                <FaFacebookF />
              </li>
            </Link>
            <Link href="https://www.instagram.com/KMaar44">
              <li className="bg-rose-500 bg-opacity-10 rounded-lg text-rose-500 text-3xl p-3 cursor-pointer hover:bg-opacity-30 transition-all duration-300">
                <FaInstagram />
              </li>
            </Link>
            <Link href="https://www.linkedin.com/in/AbhishekKMaar/">
              <li className="bg-rose-500 bg-opacity-10 rounded-lg text-rose-500 text-3xl p-3 cursor-pointer hover:bg-opacity-30 transition-all duration-300">
                <FaLinkedinIn />
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="relative bottom-0">
        <div className="flex justify-center items-center text-center w-full text-wrap mx-auto">
          <small className="text-white">
            &copy; {new Date().getFullYear()}
            <Button variant="link" className="text-white text-xs px-1" asChild>
              <Link
                href="https://kmaar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abhishek Kumar
              </Link>
            </Button>
            . All rights reserved. | Powered by
            <Button variant="link" className="text-white text-xs px-1" asChild>
              <Link
                href="https://kmstudio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                KMaar Miscellaneous Studio
              </Link>
            </Button>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
