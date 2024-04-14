import { useEffect, useState } from "react"; 
import Cookies from "js-cookie"; 
import { refreshAccessToken } from "./Token"; 
 
async function fetchReviewData(slug) { 
  try { 
    const token = Cookies.get("access_token"); 
    if (!token) { 
      await refreshAccessToken(); 
      return null; 
    } 
 
    const response = await fetch( 
      `http://127.0.0.1:8000/api/v1/course/${slug}/review`, 
      { 
        method: "GET", 
        headers: { 
          Authorization: `JWT ${Cookies.get("access_token")}`
        } 
      } 
    ); 
 
    if (response.ok) { 
      console.log(response);
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
 
export function useReviewData(slug) { 
  const [reviewData, setReviewData] = useState(null); 
 
  useEffect( 
    () => { 
      async function fetchData() { 
        const data = await fetchReviewData(slug); 
        setReviewData(data); 
      } 
 
      fetchData(); 
    }, 
    [slug] 
  ); 
 
  return reviewData; 
}