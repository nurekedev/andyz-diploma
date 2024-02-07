import { Avatar, AvatarGroup, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

export const UserPost = ({postImg, postTitle, likes, replies}) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/markzhuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Your King" src="/zuck-avatar.png" />
          <Box w={{
            base: 0.05,
            md: 0.5
          }} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <AvatarGroup size="xs" max={2}>
            <Avatar name="Kent Dodds" src="https://ru-static.z-dn.net/files/d60/ad56ca6ecf1840e355e06969eb716a14.jpeg" />
              <Avatar name="Ryan Florence" src="https://distribution.faceit-cdn.net/images/b459c79c-c398-42b5-8162-e00b4020ba73.jpeg" />
              <Avatar name="Segun Adebayo" src="https://distribution.faceit-cdn.net/images/5161bf2f-7b5c-46f9-b53d-f614a8b1314f.jpeg" />
              
              <Avatar name="Prosper Otemuyiwa" src="https://ru-static.z-dn.net/files/d5e/a295fd667799bea1660b9b3cc4cbd9b1.jpg"
              />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup>
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>yourking</Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}/>
                </Flex>
                <Flex gap={3} alignItems={"center"}>
                  <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                  <BsThreeDots/>
                </Flex>

            </Flex>
            <Text fontSize={"sm"}>{postTitle}</Text>
            {postImg && (
              <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray"}>
              <Image src={postImg} w={"full"}/>
              </Box>
            )}

            <Flex gap={3} my={1}>
              <Actions liked={liked} setLiked={setLiked} />
            </Flex>

            <Flex gap={2} alignItems={"center"}>
              <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>
              <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
              <Text color={"gray.light"} fontSize={"sm"}>{likes} likes</Text>
            </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
