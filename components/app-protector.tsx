"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { AUTH_API_ROUTES } from "@/routes";
import { apiClient } from "@/lib/api-client";

const AppProtector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { userInfo, setUserInfo } = useAppStore();
  useEffect(() => {
    if (!userInfo) {
      const getUserInfo = async () => {
        const response = await apiClient.get(AUTH_API_ROUTES.ME);
        if (response.data.userInfo) {
          setUserInfo(response.data.userInfo);
        }
      };
      getUserInfo();
    }
  }, [pathName, userInfo, setUserInfo, router]);
  return null;
};

export default AppProtector;
