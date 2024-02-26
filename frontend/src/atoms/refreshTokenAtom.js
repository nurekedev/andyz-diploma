import Cookies from "js-cookie";
import { atom } from "recoil";


const refreshTokenAtom = atom({
  key: "refreshToken",
  default: Cookies.get("refresh_token")
});

export default refreshTokenAtom;