import Cookies from "js-cookie";


export async function refreshAccessToken() {
  try {
    const token = Cookies.get("refresh_token");
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
      Cookies.set("access_token", access, { expires: 5 / (24 * 60) });
    } else {
      console.error("Ошибка обновления токена");
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
