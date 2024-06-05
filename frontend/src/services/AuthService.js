import useAuthStore from "@store/AuthStore";
import axios from "axios";

const handleLogin = async credentials => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/jwt/create/",
      credentials,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 200) {
      const { access, refresh } = response.data;

      const userResponse = await axios.get(
        "http://127.0.0.1:8000/api/v1/auth/users/me",
        {
          headers: {
            Authorization: `JWT ${access}`
          }
        }
      );

      const user = userResponse.data;
      const isStaff = user.is_staff === true;

      useAuthStore.getState().login(access, refresh);
      useAuthStore.getState().setIsStaff(isStaff);
      useAuthStore.getState().updateStateFromCookies();
    } else {
      const { detail } = response.data;
      throw new Error(detail || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default handleLogin;
