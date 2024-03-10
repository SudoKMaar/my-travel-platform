import { StateCreator } from "zustand";
import { UserType } from "@/index";

export interface AuthSlice {
  userInfo: undefined | UserType;
  setUserInfo: (userInfo: UserType) => void;
  logOut: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: UserType) => set({ userInfo }),
  logOut: () => {
    set({ userInfo: undefined });
  },
});
