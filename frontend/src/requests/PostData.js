import Cookies from "js-cookie";

export async function PostData(slug, rating, description) {
  if (!rating) {
    throw new Error("Please select a rating");
  }

  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/course/${slug}/review/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${Cookies.get("access_token")}`
      },
      body: JSON.stringify({
        rating,
        description
      })
    }
  );

  if (!response.ok) {
    throw new Error("Error submitting review. Please try again later.");
  }

  console.log("Review submitted successfully!");

  return response.json(); // Возвращаем данные ответа
}
