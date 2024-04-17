/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Image, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

async function fetchCatData() {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?mime_types=gif`,
      {
        method: "GET"
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка при получении данных:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

function useCatData() {
  const [catData, setCatData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCatData();
      setCatData(data);
    }

    fetchData();
  }, []);

  return catData;
}

const NotCoursePage = () => {
  const catData = useCatData();

  return (
    <Box
      margin={"auto"}
      alignItems={"center"}
      display={"flex"}
      flexDir={"column"}
      mt={20}
      p={10}
      borderRadius={10}
      bg={useColorModeValue("white", "gray.dark")}
      textAlign={"center"}
    >
      <Text
        fontSize={{
          base: 20,
          md: 25
        }}
      >
        You don&apos;t have any courses yet 😊❤️
      </Text>
      {catData ? (
        <Image
          src={catData[0].url}
          alt="Wait the cat"
          width={400}
          objectFit={"cover"}
          mt={10}
        />
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
};

export default NotCoursePage;
