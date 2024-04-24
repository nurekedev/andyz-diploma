/* eslint-disable no-unused-vars */
import { Button} from '@chakra-ui/react'
import { useRecoilState } from 'recoil';
import accessTokenAtom from '../../atoms/accessTokenAtom';
import refreshTokenAtom from '../../atoms/refreshTokenAtom';
import isAuthenticatedAtom from '../../atoms/isAuthenticatedAtom';
import Cookies from 'js-cookie';
import { MdLogout } from "react-icons/md";

export const LogoutButton = () => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom);
    const [isAuthenticated, setIsAuthenticated] =
      useRecoilState(isAuthenticatedAtom);

    const handleLogout = () => {
      setAccessToken(null);
      Cookies.remove("access_token");
      setRefreshToken(null);
      Cookies.remove("refresh_token");
      setIsAuthenticated(false);
      Cookies.remove("isAuthenticated");  
  };
  
  return (
    <Button size={"md"} onClick={handleLogout}>
      <MdLogout />
    </Button>
  );
}
