import { VStack} from "@chakra-ui/react";
import UserHeader from "../../components/profile/UserHeader";
import Profile from "../../components/profile/Profile";

export const HomePage = () => {
  return (
    <>
        <VStack m={"0 auto"} w={"100%"} h={"100%"} gap={"30px"}>
          <UserHeader />
          <Profile />
        </VStack>
    </>
  );
};
