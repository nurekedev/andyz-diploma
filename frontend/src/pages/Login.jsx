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
    Link,
    useToast
  } from '@chakra-ui/react'
  import { useSetRecoilState} from "recoil"
  import  authAtom  from "../atoms/authAtom"
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
  import userAtom from '../atoms/userAtom'
  
  export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authAtom);
    const setUser = useSetRecoilState(userAtom);

    const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
    const toast = useToast();
    const handleLogin = async () => {
      
      try {
        console.log(inputs);
        const res = await fetch("/api/users/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs)
        });
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
          return;
        }
        console.log(data);

        localStorage.setItem("user-threads", JSON.stringify(data));
        setUser(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      }

    }
    return (
      <Flex
        
        align={'center'}
        justify={'center'}
        
       >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Have a nice day ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            width={{
                base: '100%',
                sm: '400px',
            }}

            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              
              <FormControl  isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text"
                  value={inputs.username}
                  onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
            
                  />
              </FormControl>
              <FormControl  isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}
               value={inputs.password}
               onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
             />
         <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
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
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.800"),
                  }}
                  onClick={handleLogin}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Do not have an account <Link color={'blue.400'}  onClick={() => setAuthScreen("signup")}
                  >Sign up</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }