import { useRecoilValue } from "recoil";
import accessTokenAtom from "../atoms/accessTokenAtom";

export const HomePage = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  console.log(accessToken);
  return (
    <>
      
    </>
  )
}
