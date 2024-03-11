import Image from "next/image";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookOpen, FaHome, FaHotel } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDataUsage } from "react-icons/md";
import { SidebarItem } from "@/components/sidebar-items";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
    {
      label: "Trips",
      icon: <BiSolidCategory />,
      link: "/admin/trips",
    },
    {
      label: "Hotels",
      icon: <FaHotel />,
      link: "/admin/hotels",
    },
    { label: "Bookings", icon: <FaBookOpen />, link: "/admin/bookings" },
    {
      label: "Scrape Data",
      icon: <MdOutlineDataUsage />,
      link: "/admin/scrape-data",
    },
  ];
  return (
    <div
      className={cn(
        "min-h-[100vh] overflow-hidden bg-white lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 mx-auto flex-col",
        className
      )}
    >
      <Link href="/admin/dashboard">
        <div className="pb-1 flex flex-col items-center gap-x-3">
          <Image src="/logo.webp" alt="logo" height={100} width={100} />
          <h1 className="text-2xl font-extrabold text-center text-black tracking-wide">
            My Travel Platform
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1 my-1">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            href={item.link}
            icon={item.icon}
          />
        ))}
        <SidebarItem label="Logout" href="/admin/logout" icon={<LuLogOut />} />
      </div>
    </div>
  );
};
