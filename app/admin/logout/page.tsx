import { cookies } from "next/headers";
import React from "react";
import LogoutActions from "./actions";

const LogoutPage = () => {
  async function deleteCookie() {
    "use server";
    cookies().delete("access_token");
  }
  return <LogoutActions deleteCookie={deleteCookie} />;
};

export default LogoutPage;
