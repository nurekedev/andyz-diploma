import Cookies from "js-cookie";
import { RefreshAccessToken } from "./Token";
import { useEffect, useState } from "react";

async function fetchData(pre_slug, slug, retryCount = 0) {
  console.log(`http://127.0.0.1:8000/api/v1/${pre_slug}/${slug}`);

  try {
    const token = Cookies.get("accessToken");
    const savedPreSlug = pre_slug;
    const savedSlug = slug;

    if (!token) {
      await RefreshAccessToken();

      // Повторный запрос с обновленным токеном
      const data = await fetchData(savedPreSlug, savedSlug);
      return data;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/${pre_slug}/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${Cookies.get("accessToken")}`
        }
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      // Проверка на количество попыток
      if (retryCount < 2) {
        console.warn(
          "Ошибка получения данных. Повторная попытка:",
          retryCount + 1
        );
        return await fetchData(savedPreSlug, savedSlug, retryCount + 1); // Рекурсивный вызов с увеличением счетчика попыток
      } else {
        console.error(
          "Все попытки получения данных завершились ошибкой:",
          response.status
        );
        return null;
      }
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export function useFetchData(pre_slug, slug) {
  const [data, setData] = useState(null);

  useEffect(() => {
      async function usefetchData() {
        const data = await fetchData(pre_slug, slug);
        setData(data);
      }

     
        usefetchData();
      
    }, [pre_slug, slug]); // Добавлен data в зависимости


  return data;
}
