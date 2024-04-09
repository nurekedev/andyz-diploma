import {
  Avatar,
  Box,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { useUserData } from "../../requests/UserData";
const UserHeader = () => {
  const userData = useUserData();
  return (
    <>
      <VStack
        alignItems={"center"}
        w={"100%"}
        maxW={1000}
        bg={useColorModeValue("white", "gray.dark")}
        borderRadius={10}
      >
        <Image
          src="../../public/bg.jpg"
          h={120}
          w={"100%"}
          maxW={1200}
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
        <Box
          display={"flex"}
          flexDir={{
            base: "column",
            md: "row"
          }}
          m={"auto"}
          p={"10px"}
          gap={{
            base: 5,
            sm: 20,
            md: 20
          }}
          style={{
            transform: "translateY(-60px)"
          }}
        >
          <VStack gap={0}>
            <Heading fontSize={{ base: 12, md: 16 }}>Blood Group</Heading>
            <Text fontSize={{ base: 18, md: 24 }}>{userData?.blood_group}</Text>
          </VStack>
          <VStack gap={0}>
            <Heading fontSize={{ base: 12, md: 16 }}>Identifier Number</Heading>
            <Text fontSize={{ base: 18, md: 24 }}>
              {userData?.identifier_number}
            </Text>
          </VStack>
          <VStack gap={0}>
            <Heading fontSize={{ base: 12, md: 16 }}>Gender</Heading>
            <Text fontSize={{ base: 18, md: 24 }}>{userData?.gender}</Text>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default UserHeader;
