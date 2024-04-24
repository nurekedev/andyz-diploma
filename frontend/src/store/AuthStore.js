import create from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create(set => ({
  isAuthenticated: false,
  login: (accessToken, refreshToken) => {
    Cookies.set("isAuthenticated", "true", { expires: 15 / (24 * 60) }); // 15 минут в долях от суток
    Cookies.set("accessToken", accessToken, { expires: 5 / (24 * 60) }); // 5 минут в долях от суток
    Cookies.set("refreshToken", refreshToken, { expires: 15 / (24 * 60) }); // 15 минут в долях от суток
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("isAuthenticated");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ isAuthenticated: false });
  }
}));

export default useAuthStore;
