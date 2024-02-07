import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

export const Comment = ({userAvatar, createAt, username, likes, comment}) => {
    const [liked, setLiked] = useState(false);
  return (
    <div>
        <Flex gap={4} my={2} py={2} w={"full"}> 
            <Avatar src={userAvatar} size={"sm"}/>
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                    <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.liht"}>{createAt}</Text>
                        <BsThreeDots/>
                    </Flex>
                </Flex>
                <Text>{comment}</Text>
                <Actions liked={liked} setLiked={setLiked} />
                <Text fontSize={"sm"} color={"gray.light"}>
                    {likes + (liked ? 1 : 0)} likes
                </Text>
            </Flex>
        </Flex>
        <Divider />
    </div>
  )
}
