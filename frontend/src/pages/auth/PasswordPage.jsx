import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PasswordPage() {
const navigate = useNavigate();
 const [inputs, setInputs] = useState({
   email: "",
 });
 const toast = useToast();

 const handleLogin = async () => {
   try {
     const response = await fetch(
       "http://127.0.0.1:8000/api/v1/auth/users/reset_password/",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(inputs)
       }
     );

     if (response.ok) {
        toast({
          description: "Ссылка для востонавления пароля отправлен в адрес электронной почты",
          status: "Success",
          duration: 2000
        });
       navigate("/auth");
       // Перенаправление на главную страницу
     } else {
       const { message } = await response.json();
       toast({
         title: "Ошибка при востонавлении пароля",
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
    <>
      <Flex align={"center"} justify={"center"} m={"auto"}>
        <Stack spacing={8} mx={"auto"} my={100} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            
            <Text textAlign={"center"} fontSize={"2xl"} color={"gray.600"}>
              Write password in your mind <br /> (❁´◡`❁)
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
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs((inputs) => ({
                        ...inputs,
                        email: e.target.value
                      }))
                    }
                  />
                  
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
                  Reset
                </Button>
              </Stack>
              
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
