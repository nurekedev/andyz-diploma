import { create } from "zustand";
import Cookies from "js-cookie";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools((set) => ({
    isStaff: Cookies.get("isStaff") === "true",
    login: (accessToken, refreshToken) => {
      Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hour
      Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
      set({ isAuthenticated: !!refreshToken });
    },
    logout: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("isStaff");
      set({ isStaff: false, isAuthenticated: false });
    },
    setIsStaff: isStaff => {
      Cookies.set("isStaff", isStaff ? "true" : "false", {
        expires: 1 / 24 // 1 hour
      });
      set({ isStaff: isStaff });
    },
    isAuthenticated: !!Cookies.get("refreshToken")
  }))
);

export default useAuthStore;
