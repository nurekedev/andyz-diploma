import { useEffect, useState } from "react";
import Cookies from "js-cookie";

async function fetchUserData() {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      await refreshAccessToken();
      return null;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${Cookies.get("access_token")}`
        }
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка при получении данных:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

async function refreshAccessToken() {
  try {
    const token = Cookies.get("refresh_token");
    console.log(token);
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`
        },
        body: JSON.stringify({
          "refresh": `${token}`
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

export function useUserData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUserData();
      setUserData(data);
    }

    fetchData();
  }, []);

  return userData;
}
