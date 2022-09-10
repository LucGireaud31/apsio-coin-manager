import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      textAlign="center"
      flexDir="column"
      h="100vh"
      bgGradient="linear(to-b,primary.600,red.600)"
      color="white"
    >
      <Heading mt="50px">La page que vous cherchez est introuvable</Heading>
      <Button
        mt="50px"
        mx="auto"
        w="200px"
        colorScheme="primary"
        onClick={() => navigate("/")}
      >
        Retourner à l'accueil
      </Button>
    </Flex>
  );
}
