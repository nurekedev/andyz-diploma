/* eslint-disable no-unused-vars */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Image
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import isAuthenticatedAtom from "../../atoms/isAuthenticatedAtom";
import accessTokenAtom from "../../atoms/accessTokenAtom";
import refreshTokenAtom from "../../atoms/refreshTokenAtom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/jwt/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inputs)
        }
      );

      if (response.ok) {
        const { access, refresh } = await response.json();

        // Сохранение токенов и установка статуса аутентификации
        setAccessToken(access);
        // Установка куки для access token с сроком 5 минут
        Cookies.set("access_token", access, { expires: 5 / (24 * 60) }); // 5 минут в долях от суток

        setRefreshToken(refresh);
        // Установка куки для refresh token с сроком 15 минут
        Cookies.set("refresh_token", refresh, { expires: 15 / (24 * 60) }); // 15 минут в долях от суток

        setIsAuthenticated(true);
        Cookies.set("isAuthenticated", "true", { expires: 15 / (24 * 60) });

        // Перенаправление на главную страницу
      } else {
        const { message } = await response.json();
        toast({
          title: "Неправильный логин или пароль",
          description: message,
          status: "error",
          duration: 2000
        });
      }
    } catch (error) {
          toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true
        });
    }
  };

  return (
    <Flex justify={"center"} m={"10vh auto 0"} >
      <Stack spacing={8} px={6} >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Have a nice day ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          width={{
            base: "100%",
            sm: "400px"
          }}
          boxShadow={"lg"}
          p={8}
        >
          <Image
            w={100}
            mb={4}
            scale={2}
            objectFit={"cover"}
            src="../../public/logo.png"
          />
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={inputs.email}
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    email: e.target.value
                  }))
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      password: e.target.value
                    }))
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.500", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800")
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <Link to={"/reset-password"}>
              <Text
                textAlign={"center"}
                color={"gray.400"}
                _hover={{
                  color: useColorModeValue("gray.600", "gray.700")
                }}
              >
                Forgot password?
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
