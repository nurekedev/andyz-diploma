import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import AllUsers from "../../components/users/AllUsers";
import CreateUser from "../../components/users/CreateUser";
const Users = () => {
  return (
    <Box maxW={1200} m={"auto"} p={4} bg={useColorModeValue( "white","gray.dark",)}>
      <Tabs isFitted >
        <TabList>
          <Tab>Users</Tab>
          <Tab>CreateUser</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllUsers />
          </TabPanel>
          <TabPanel>
            <CreateUser />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Users;
