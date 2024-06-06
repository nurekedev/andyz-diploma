import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AccountActivation = () => {
  const { uid, token } = useParams();
  const [activationStatus, setActivationStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.post("/api/auth/activate/", {
          uid,
          token
        });
        if (response.ok) {
          console.log("success");
        }
        setActivationStatus("success");
      } catch (error) {
        setActivationStatus("failure");
      }
    };

    activateAccount();
  }, [uid, token]);

  return (
    <div>
      {activationStatus === "success" ? (
        <div>
          <h1>Ваш аккаунт успешно активирован!</h1>
          <button onClick={() => navigate("/login")}>Перейти к входу</button>
        </div>
      ) : activationStatus === "failure" ? (
        <div>
          <h1>Произошла ошибка при активации аккаунта.</h1>
          <button onClick={() => navigate("/")}>Вернуться на главную</button>
        </div>
      ) : (
        <h1>Активация аккаунта...</h1>
      )}
    </div>
  );
};

export default AccountActivation;
