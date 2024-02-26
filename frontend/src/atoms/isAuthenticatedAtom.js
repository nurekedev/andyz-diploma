import Cookies from "js-cookie";
import { atom } from "recoil";

const isAuthenticatedAtom = atom({
  key: "isAuthenticated",
  default: Cookies.get("isAuthenticated")
});
export default isAuthenticatedAtom;