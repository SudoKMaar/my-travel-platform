import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./auth-slice";
import { ScrapingSlice, createScrapingSlice } from "./scraping-slice";

type StoreState = AuthSlice & ScrapingSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createScrapingSlice(...a),
}));
