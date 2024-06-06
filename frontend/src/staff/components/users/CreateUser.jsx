import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useUserStore from "../../../store/UserStore";

const CreateUser = () => {
  const toast = useToast();
  const createUser = useUserStore((state) => state.createUser);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    identifier_number: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    address_line: "",
    email: "",
    password: "",
    re_password: ""
  });

  const handleGenderChange = (gender) => {
    setInputs((inputs) => ({
      ...inputs,
      gender: gender
    }));
  };

  const handleCreate = async () => {
    const updatedInputs = { ...inputs, re_password: inputs.password };
    console.log(updatedInputs);

    for (const [key, value] of Object.entries(updatedInputs)) {
      if (!value) {
        toast({
          title: `Field ${key.replace(/_/g, " ")} is required`,
          status: "error",
          duration: 3000,
          isClosable: true
        });
        return;
      }
    }

    try {
      await createUser(updatedInputs);
      toast({
        title: "User Created",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      setInputs({
        first_name: "",
        last_name: "",
        identifier_number: "",
        date_of_birth: "",
        gender: "",
        phone_number: "",
        address_line: "",
        email: "",
        password: "",
        re_password: ""
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating user",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      gap={5}
      maxW={600}
      m={"3rem auto "}
    >
      <Box
        display={{
          base: "block",
          md: "flex"
        }}
        gap={2}
      >
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            value={inputs.first_name}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                first_name: e.target.value
              }))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            value={inputs.last_name}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                last_name: e.target.value
              }))
            }
          />
        </FormControl>
      </Box>
      <Box
        display={{
          base: "block",
          md: "flex"
        }}
        gap={2}
      >
        <FormControl isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            value={inputs.date_of_birth}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                date_of_birth: e.target.value
              }))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Identifier Number</FormLabel>
          <Input
            type="text"
            value={inputs.identifier_number}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                identifier_number: e.target.value
              }))
            }
          />
        </FormControl>
      </Box>

      <FormControl isRequired>
        <FormLabel>Gender</FormLabel>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"full"}>
            {inputs.gender || "Select Gender"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleGenderChange("male")}>Male</MenuItem>
            <MenuItem onClick={() => handleGenderChange("female")}>
              Female
            </MenuItem>
          </MenuList>
        </Menu>
      </FormControl>

      <Box
        display={{
          base: "block",
          md: "flex"
        }}
        gap={2}
      >
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            value={inputs.phone_number}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                phone_number: e.target.value
              }))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Address Line</FormLabel>
          <Input
            type="text"
            value={inputs.address_line}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                address_line: e.target.value
              }))
            }
          />
        </FormControl>
      </Box>
      <Box
        display={{
          base: "block",
          md: "flex"
        }}
        gap={2}
      >
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
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
          <Input
            type="password"
            value={inputs.password}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                password: e.target.value
              }))
            }
          />
        </FormControl>
      </Box>
      <Button onClick={handleCreate}>Create User</Button>
    </Box>
  );
};

export default CreateUser;
