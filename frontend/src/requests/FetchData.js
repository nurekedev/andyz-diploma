import Cookies from "js-cookie";
import { refreshAccessToken } from "./Token";
import { useEffect, useState } from "react";

async function fetchData(pre_slug, slug) {
  let token = Cookies.get("accessToken");
    if (!token || token === "undefined" || token === "null") {
      const response = await refreshAccessToken();
      if (!response.ok) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("isAuthenticated");
        location.reload();
      }
    }
  try {
        const response = await fetch(
      `http://127.0.0.1:8000/api/v1/${pre_slug}/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export function useFetchData(pre_slug, slug) {
  const [data, setData] = useState(null);

  useEffect(
    () => {
      async function usefetchData() {
        const data = await fetchData(pre_slug, slug);
        setData(data);
      }

      usefetchData();
    },
    [pre_slug, slug]
  );

  return data;
}
