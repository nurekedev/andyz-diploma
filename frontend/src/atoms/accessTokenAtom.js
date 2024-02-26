import Cookies from "js-cookie";
import { atom } from "recoil";

const accessTokenAtom = atom({
  key: "accessToken",
  default: Cookies.get("access_token")
});


export default accessTokenAtom; 