import { Button, useToast } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil';
import authAtom from '../atoms/authAtom';

export const LogoutButton = () => {
    const setUser = useSetRecoilState(authAtom)
    const toast = useToast();
    const handleLogout = async() => {
        try {
            const res = await fetch("/api/users/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
                return
            }
            localStorage.removeItem("user-threads");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Button position={'fixed'} top={30} right={30} size={"sm"} onClick={handleLogout}>Logout</Button>
  )
}
