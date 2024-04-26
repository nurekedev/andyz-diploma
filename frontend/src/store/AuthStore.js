import create from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create(set => ({
  isAuthenticated: Cookies.get("isAuthenticated") === "true",
  login: (accessToken, refreshToken) => {
    Cookies.set("isAuthenticated", "true", { expires: 15 / (24 * 60) });
    Cookies.set("accessToken", accessToken, { expires: 5 / (24 * 60) });
    Cookies.set("refreshToken", refreshToken, { expires: 15 / (24 * 60) });
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("isAuthenticated");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ isAuthenticated: false });
  }
}));

// Восстановление состояния из куки при загрузке страницы
if (Cookies.get("isAuthenticated") === "true") {
  useAuthStore
    .getState()
    .login(Cookies.get("accessToken"), Cookies.get("refreshToken"));
}

export default useAuthStore;
