import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshAccessToken } from "./Token";

async function fetchCourseData() {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      await refreshAccessToken();
      return null;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/courses/my-courses/",
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

export function useCourseData() {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCourseData();
      setCourseData(data);
    }

    fetchData();
  }, []);

  return courseData;
}
