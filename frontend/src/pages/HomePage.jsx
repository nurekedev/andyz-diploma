import { VStack} from "@chakra-ui/react";
import UserHeader from "../components/UserHeader";
import Profile from "./Profile";

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
