import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

export default function CourseTabs() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Comments</Tab>
          <Tab>Reviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
