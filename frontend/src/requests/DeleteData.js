import Cookies from "js-cookie";

export async function DeleteData(slug, id) {

  const url = `http://127.0.0.1:8000/api/v1/course/${slug}/review/${id}/`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${Cookies.get("access_token")}`
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error submitting review: ${errorText}`);
  }
}
