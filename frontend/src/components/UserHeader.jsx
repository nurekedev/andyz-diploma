import {
  Avatar,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { useUserData } from "../token/UserData"; 
const UserHeader = () => {
const userData = useUserData();
  return (
    <>
      <VStack
        alignItems={"center"}
        bg={useColorModeValue("white", "gray.dark")}
        h={300}
        borderRadius={10}
      >
        <Image
          src="../../public/bg.jpg"
          h={120}
          w={1200}
          objectFit={"cover"}
          borderTop={10}
        />
        <Avatar
          src="../../public/zuck-avatar.png"
          boxSize={120}
          style={{
            transform: "translateY(-60px)"
          }}
        />
        <HStack
          m={"auto"}
          p={"10px"}
          gap={20}
          style={{
            transform: "translateY(-60px)"
          }}
        >
          <VStack gap={2}>
            <Heading fontSize={14}>Date of Birth</Heading>
            <Text as={"h2"}>{userData?.date_of_birth}</Text>
          </VStack>
          <VStack>
            <Heading fontSize={14}>Identifier Number</Heading>
            <Text as={"h2"}>{userData?.identifier_number}</Text>
          </VStack>
          <VStack>
            <Heading fontSize={14}>Gender</Heading>
            <Text as={"h2"}>{userData?.gender}</Text>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default UserHeader;
