import useAuthStore from "@store/AuthStore";
import axios from "axios";

const handleLogin = async credentials => {
  try {
    const {
      data,
      status
    } = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/jwt/create/",
      credentials,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (status === 200) {
      const { access, refresh } = data;

      const {
        data: user
      } = await axios.get("http://127.0.0.1:8000/api/v1/auth/users/me", {
        headers: {
          Authorization: `JWT ${access}`
        }
      });

      const isStaff = user.is_staff === true;

      const authStore = useAuthStore.getState();
      authStore.login(access, refresh);
      authStore.setIsStaff(isStaff);
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default handleLogin;
