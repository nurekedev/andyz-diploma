import {
  Avatar,
  Box,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import banner from "@assets/banner.jpg";

const UserHeader = ({ userData }) => {
  return (
    <>
      <VStack
        alignItems={"center"}
        w={"100%"}
        maxW={1000}
        bg={useColorModeValue("white", "gray.dark")}
        borderRadius={10}
        pos={"relative"}
      >
        <Image
          src={banner}
          h={120}
          w={"100%"}
          maxW={1200}
          objectFit={"cover"}
          className="profile-img"
        />
        <Avatar
          src={userData?.avatar || ""}
          m={"auto"}
          boxSize={120}
          style={{
            transform: "translateY(-60px)"
          }}
        />

        <Box
          display="flex"
          flexDirection={{
            base: "column",
            sm: "row"
          }}
          gap={{
            base: 5,
            sm: 10,
            md: 15,
            xl: 20
          }}
          justifyContent="center"
          alignItems="center"
          style={{
            transform: "translateY(-40px)"
          }}
        >
          <VStack gap={0} w={100}>
            <Heading fontSize={{ base: 12, md: 16 }}>Blood Group</Heading>

            {userData ? (
              <Text fontSize={{ base: 20, md: 24 }}>
                {userData?.blood_group}
              </Text>
            ) : (
              <Skeleton height="30px" w={"full"} />
            )}
          </VStack>
          <VStack gap={0} w={200}>
            <Heading fontSize={{ base: 12, md: 16 }}>Identifier Number</Heading>

            {userData ? (
              <Text fontSize={{ base: 20, md: 24 }}>
                {userData?.identifier_number}
              </Text>
            ) : (
              <Skeleton height="30px" w={"full"} />
            )}
          </VStack>
          <VStack gap={0} w={100}>
            <Heading fontSize={{ base: 12, md: 16 }}>Gender</Heading>
            {userData ? (
              <Text fontSize={{ base: 20, md: 24 }}>{userData?.gender}</Text>
            ) : (
              <Skeleton height="30px" w={"full"} />
            )}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default UserHeader;
