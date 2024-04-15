import { VStack} from "@chakra-ui/react";
import UserHeader from "../../components/profile/UserHeader";
import Profile from "../../components/profile/Profile";
import { useFetchData } from "../../requests/FetchData";

export const HomePage = () => {
  const userData = useFetchData("auth/users/me", "");
  return (
    <>
      <VStack m={"0 auto"} w={"100%"} h={"100%"} gap={"30px"}>
        <UserHeader userData={userData} />
        <Profile userData={userData} />
      </VStack>
    </>
  );
};
