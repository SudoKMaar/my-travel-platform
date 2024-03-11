"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  icon: JSX.Element;
  href: string;
  onClick?: () => void;
};

export const SidebarItem = ({ label, icon, href, onClick }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px] "
      asChild
      onClick={onClick}
    >
      <Link href={href}>
        <div className="flex items-center">
          {icon}
          <span className="ml-5">{label}</span>
        </div>
      </Link>
    </Button>
  );
};
