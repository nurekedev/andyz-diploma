import Cookies from "js-cookie";

export async function PatchData(slug, rating, description, id) {
  if (!rating) {
    throw new Error("Please select a rating");
  }

  const url = `http://127.0.0.1:8000/api/v1/course/${slug}/review/${id}/`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${Cookies.get("access_token")}`
    },
    body: JSON.stringify({
      rating,
      description
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error submitting review: ${errorText}`);
  }

  console.log("Review submitted successfully!");

  return response.json();
}
