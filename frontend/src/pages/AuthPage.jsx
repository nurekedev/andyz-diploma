import { useRecoilValue } from "recoil"
import authAtom from "../atoms/authAtom"
import Login from "./Login"
import SignUp from "./SignUp"

export const AuthPage = () => {
    const authScreenState = useRecoilValue(authAtom);
    return (
    <>
        {authScreenState === "login" ? <Login /> : <SignUp />}
    </>
  )
}
