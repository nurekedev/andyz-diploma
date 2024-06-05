/* eslint-disable no-unused-vars */
import { Button} from '@chakra-ui/react'
import Cookies from 'js-cookie';
import { MdLogout } from "react-icons/md";
import useAuthStore from "@store/AuthStore";

export const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout); // Получаем функцию logout из хранилища Zustand

  const handleLogout = () => {
    logout(); // Вызываем функцию logout для выхода из системы
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("isAuthenticated");
  };

  return (
    <Button size={"md"} onClick={handleLogout}>
      <MdLogout />
    </Button>
  );
};
