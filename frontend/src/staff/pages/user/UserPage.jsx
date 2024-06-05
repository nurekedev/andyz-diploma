import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import UserInfo from "../../components/user/UserInfo";

const UserPage = () => {
  return (
    <div>
      <Box
        maxW={1200}
        m={"auto"}
        p={4}
        bg={useColorModeValue("white", "gray.dark")}
      >
        <Tabs>
          <TabList>
            <Tab>Enrolments</Tab>
            <Tab>Records</Tab>
            <Tab>Markers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box><UserInfo /></Box>
            </TabPanel>
            <TabPanel>
              <Box>2</Box>
            </TabPanel>
            <TabPanel>
              <Box>3</Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default UserPage