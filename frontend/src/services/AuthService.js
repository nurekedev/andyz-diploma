import useAuthStore from "@store/AuthStore";
import axios from "axios";
import { API } from "./functions";

const handleLogin = async credentials => {
  try {
    const {
      data,
      status
    } = await axios.post(
      `${API}/auth/jwt/create/`,
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
      } = await axios.get(`${API}/auth/users/me`, {
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
