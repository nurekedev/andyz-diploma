import Cookies from "js-cookie";
import useAuthStore from "../store/AuthStore";


export async function RefreshAccessToken() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const logout = useAuthStore(state => state.logout); 
  try {
    const token = Cookies.get("refreshToken");
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          refresh: `${token}`
        })
      }
    );

    if (response.ok) {
      const { access } = await response.json();
      Cookies.set("accessToken", access, { expires: 5 / (24 * 60) });
      
    } else {
      console.error("Ошибка обновления токена");
      logout();
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
