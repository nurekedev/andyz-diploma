/* eslint-disable no-unused-vars */
import { Button} from '@chakra-ui/react'
import { useRecoilState } from 'recoil';
import accessTokenAtom from '../atoms/accessTokenAtom';
import refreshTokenAtom from '../atoms/refreshTokenAtom';
import isAuthenticatedAtom from '../atoms/isAuthenticatedAtom';
import Cookies from 'js-cookie';

export const LogoutButton = () => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom);
    const [isAuthenticated, setIsAuthenticated] =
      useRecoilState(isAuthenticatedAtom);

    const handleLogout = () => {
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
      Cookies.remove("isAuthenticated");  
  };
  
  return (
    <Button  size={"sm"} onClick={handleLogout}>Logout</Button>
  )
}
