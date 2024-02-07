import { VStack, Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react";
import {BsInstagram} from "react-icons/bs"
import {CgMoreO} from 'react-icons/cg'

export const UserHeader = () => {
    const toast = useToast();
    const copyUrl = () => {
        const currenUrl = window.location.href;
        navigator.clipboard.writeText(currenUrl).then(()=> {
            toast({
                description: "Link is copied!",
                status: "success",
                duration: 2000,
                isClosable: true,
              })
        })
    }

  return (
    <VStack gap={4} alignItems={"start"}>

      <Flex justifyContent={"space-between"} w={"full"}>

        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>Your King</Text>
          <Flex>
            <Text fontSize={"sm"}>@yourking</Text>
            <Text fontSize={"xs"}
            bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={"full"} ml={3}>theads.net</Text>
          </Flex>
        </Box>

        <Box>
          <Avatar name="Your King" src="/zuck-avatar.png" size={
            {
                base: "xl",
                md: "2xl"
            }
          } />
        </Box>

      </Flex>
        <Text>Lorem ipsum</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={'gray.light'}>3.2 folowwers</Text>
                <Box w={1} h={1} bg={"gray.ligth"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className="icon-container">
                    <BsInstagram size={24} cursor={'pointer'}/>
                </Box>
                <Box className="icon-container">
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={'pointer'}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Flex>
        <Flex  w={"full"}>
            <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Threads</Text>
            </Flex>

            <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={'gray.light'} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Replies</Text>
            </Flex>
        </Flex>
    </VStack>
  );
};
