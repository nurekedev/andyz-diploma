import Cookies from "js-cookie";

export const RefreshAccessToken = async () => {
  try {
    const refresh = Cookies.get("refreshToken");
    const response = await fetch(
      "http://api.andyz.kz/api/v1/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refresh })
      }
    );

    if (!response.ok) {
      Cookies.remove("refreshToken");
      throw new Error("Failed to refresh token");
    }

    const data = await response.json(); // Правильно извлекаем JSON из ответа
    const access = data.access; // Получаем токен доступа из ответа

    if (access) {
      Cookies.set("accessToken", access, { expires: 5 / (24 * 60) }); // Токен истекает через 5 минут
      console.log("Access token refreshed:", access);
      return access; // Возвращаем токен доступа
    }

    throw new Error("No access token in response");
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
