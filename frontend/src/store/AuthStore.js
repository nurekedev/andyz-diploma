import { create } from "zustand";
import Cookies from "js-cookie";
import { RefreshAccessToken } from "../services/Token";

const useAuthStore = create(set => ({
  isStaff: Cookies.get("isStaff") === "true",
  login: (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hour
    Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
  },
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("isStaff");
    set({ isStaff: false });
  },
  setIsStaff: isStaff => {
    Cookies.set("isStaff", isStaff ? "true" : "false", {
      expires: 1 / 24 // 1 hour
    });
    set({ isStaff: isStaff });
  },
  updateStateFromCookies: async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      if (accessToken === undefined) {
        try {
          await RefreshAccessToken(refreshToken);
        } catch (error) {
          set({ isStaff: false });
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("isStaff");
        }
      }
      set({
        isStaff: Cookies.get("isStaff") === "true"
      });
    } else {
      set({ isStaff: false });
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("isStaff");
    }
  },
  isAuthenticated: () => {
    return !!Cookies.get("refreshToken");
  }
}));

useAuthStore.getState().updateStateFromCookies();

export default useAuthStore;
