import Cookies from "js-cookie";
import  useRecoilState from "recoil";
import accessTokenAtom from "../atoms/accessTokenAtom";

export const checkToken = () => {
  const token = Cookies.get("access_token");
  console.log(token);
  if (token) {
    fetch("http://127.0.0.1:8000/api/v1/auth/jwt/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 400) {
          // Попытка обновить токен
          return RefreshToken();
        } else {
          return Promise.resolve(true); // Токен действителен
        }
      })
      .then(valid => {
        if (!valid) {
          // Если токен не действителен или не удалось его обновить
          Cookies.remove("access_token");
          window.location.reload();
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  } else {
      return RefreshToken();
  }
};


function RefreshToken() {
  const { refreshToken, setAccessToken } = useRecoilState(accessTokenAtom);

  const refreshAccessToken = async () => {
    // Отправка запроса на обновление токена
    const response = await fetch("http://127.0.0.1:8000/api/v1/auth/jwt/refresh/", {
      method: "POST",
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    });

    if (response.ok) {
      const { access_token } = await response.json();

      // Сохранение нового access токена
      setAccessToken(access_token);
    } else {
      // Ошибка обновления токена - необходимо выполнить выход из системы
      console.error("Ошибка обновления токена");
    }
  };

  return refreshAccessToken;
}


