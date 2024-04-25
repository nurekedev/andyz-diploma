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
  Image,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import handleLogin from "../../services/AuthService";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const handleLoginClick = () => {
    handleLogin(inputs)
      .then(() => {
        toast({
          title: "Success Login",
          status: "success",
          duration: 2000,
          isClosable: true
        });
      })
      .catch((error) => {
        // Обработка ошибки, например, показ toast с сообщением об ошибке
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true
        });
      });
  };

  return (
    <Flex justify={"center"} m={"10vh auto 0"}>
      <Stack spacing={8} px={6}>
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
                onClick={handleLoginClick}
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
