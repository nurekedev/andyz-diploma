import Cookies from "js-cookie";
import { refreshAccessToken } from "./Token";

export async function fetchData(course_slug) {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      await refreshAccessToken();
      return null;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/progress/get-enrollment-courses/${course_slug}/`,
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
