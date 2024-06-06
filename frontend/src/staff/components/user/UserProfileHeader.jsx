import { Avatar, Box, Button, Heading, Text } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";

const UserProfileHeader = ({ user }) => {
  return (
    <Box mb={10} display={{ base: "block", md: "flex" }} gap={5}>
      <Avatar src={user?.avatar} height={"full"} size="2xl" />
      <Box gap={5} display={{ base: "block", md: "flex" }}>
        <Box>
          <Box mb={4}>
            <Heading fontSize={12}>gender</Heading>
            <Text fontSize={{ base: 20, md: 24 }}>{user?.gender}</Text>
          </Box>
          <Box mb={4}>
            <Heading fontSize={12}>blood group</Heading>
            <Text fontSize={{ base: 20, md: 24 }}>{user?.blood_group}</Text>
          </Box>
        </Box>
        <Box>
          <Box mb={4}>
            <Heading fontSize={12}>full name</Heading>
            <Text fontSize={{ base: 20, md: 24 }}>{user?.full_name}</Text>
          </Box>
          <Box mb={4}>
            <Heading fontSize={12}>email</Heading>
            <Text fontSize={{ base: 20, md: 24 }}>{user?.email}</Text>
          </Box>
        </Box>
      </Box>
      <Button ml={"auto"}>
        <MdModeEditOutline />
      </Button>
    </Box>
  );
};

export default UserProfileHeader;
