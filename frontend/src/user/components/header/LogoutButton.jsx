import { Button } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import useAuthStore from "@store/AuthStore";

export const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout); // Получаем функцию logout из хранилища Zustand

  const handleLogout = () => {
    logout();
  };

  return (
    <Button size={"md"} onClick={handleLogout}>
      <MdLogout />
    </Button>
  );
};
