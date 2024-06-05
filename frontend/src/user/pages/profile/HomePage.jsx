import { VStack } from "@chakra-ui/react";
import UserHeader from "../../components/profile/UserHeader";
import UserMainInfo from "../../components/profile/UserMainInfo";
import { fetchUser } from "../../../services/api";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUser();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <VStack m={"0 auto"} w={"100%"} h={"100%"} gap={"30px"}>
        <UserHeader userData={userData} />
        <UserMainInfo userData={userData} />
      </VStack>
    </>
  );
};
