import { VStack} from "@chakra-ui/react";
import UserHeader from "../../components/profile/UserHeader";
import UserMainInfo from "../../components/profile/UserMainInfo";
import { useFetchData } from "../../requests/FetchData";

export const HomePage = () => {
  const userData = useFetchData("auth/users/me", "");
  
  return (
    <>
      <VStack m={"0 auto"} w={"100%"} h={"100%"} gap={"30px"}>
        <UserHeader userData={userData} />
        <UserMainInfo userData={userData} />
      </VStack>
    </>
  );
};
