import {
  Avatar,
  Flex,
  Text,
  Box,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import { Comment } from "../components/Comment";

export default function PostPage() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Your King" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              yourking
            </Text>
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            Id
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Lorem ipsum did</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray"}>
        <Image src="/post1.png" w={"full"} />
      </Box>

      <Flex>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          238 replies
        </Text>
        <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to reply and post.</Text>
        </Flex>

        <Button>Get </Button>
      </Flex>

      <Divider my={4} />
      <Comment
        comment="CrazyHorse"
        createAt="2d"
        likes={105}
        username="John"
        userAvatar="https://ru-static.z-dn.net/files/d5e/a295fd667799bea1660b9b3cc4cbd9b1.jpg"
      />

      <Comment
        comment="CrazyHorse"
        createAt="2d"
        likes={105}
        username="John"
        userAvatar="https://ru-static.z-dn.net/files/d5e/a295fd667799bea1660b9b3cc4cbd9b1.jpg"
      />

      <Comment
        comment="CrazyHorse"
        createAt="2d"
        likes={105}
        username="John"
        userAvatar="https://ru-static.z-dn.net/files/d5e/a295fd667799bea1660b9b3cc4cbd9b1.jpg"
      />
    </>
  );
}
