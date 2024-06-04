
import useAuthStore from "../store/AuthStore";

const handleLogin = async credentials => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/jwt/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      }
    );
    
    if (response.ok) {
      const { access, refresh } = await response.json();
      useAuthStore.getState().login(access, refresh);
    } else {
      const { message } = await response.json();
      console.log(message);
    }
  } catch (error) {
    console.log(error);
  }
};

export default handleLogin;
