import Cookies from "js-cookie";

export const RefreshAccessToken = async () => {
  try {
    const token = Cookies.get("refreshToken");
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          refresh: `${token}`
        })
      }
    );

    if (!response.ok) {
      Cookies.remove("refreshToken");
      throw new Error("Failed to refresh token");
    }
    if (response.ok) {
      const access  = await response.access;
      Cookies.set("accessToken", access, { expires: 5 / (24 * 60) }); // Token expires in 5 minutes
    }
    return response;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
