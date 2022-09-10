import {
  Flex,
  VStack,
  Box,
  Image,
  IconButton,
  Text,
  ChakraProps,
} from "@chakra-ui/react";
import { CSSObject } from "@emotion/react";
import {
  ChalkboardTeacher,
  GraduationCap,
  MagnifyingGlass,
  TerminalWindow,
  UserCircle,
} from "phosphor-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useNoScroll } from "../../../hooks/useNoScroll";

interface LayoutProps {
  status: "visiteur" | "etudiant" | "prof" | "admin" | null;
}

const hoverStyle: CSSObject = {
  color: "gray.200",
};
const selectedStyle: ChakraProps = {
  color: "primary.100",
  cursor: "default",
  _hover: {},
};
const linkSize = 32;
const linkMarginTop = "-6px";

export function Layout({ status }: LayoutProps) {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  useNoScroll();

  function handleNavigate(url: string) {
    navigate(url);
    setSelected(url);
  }

  return (
    <Flex bgGradient="linear(to-b,primary.600,red.600)" color="white">
      <Flex
        w="100px"
        justifyContent="center"
        flexDir="column"
        position="relative"
      >
        <IconButton
          aria-label="home"
          top="30px"
          left="25px"
          h="50px"
          w="50px"
          position="absolute"
          rounded="xl"
          bg="white"
          _hover={{ bg: "gray.100" }}
          icon={<Image src="/images/logo.png" />}
          onClick={() => handleNavigate("/")}
        />

        {status != null && (
          <VStack my="auto" spacing="20px" align="center">
            {/* // ADMIN */}
            {status == "admin" && (
              <>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("rechercher")}
                  {...(selected == "rechercher" && selectedStyle)}
                >
                  <Box as={MagnifyingGlass} size={linkSize} mx="auto" />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Rechercher
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("admin")}
                  {...(selected == "admin" && selectedStyle)}
                >
                  <Box as={TerminalWindow} size={linkSize} mx="auto" />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Admin
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("degrees")}
                  {...(selected == "degrees" && selectedStyle)}
                >
                  <Box as={GraduationCap} size={linkSize} mx="auto" />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Diplômes
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("profil")}
                  {...(selected == "profil" && selectedStyle)}
                >
                  <Box as={UserCircle} size={linkSize} mx="auto" />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Profil
                  </Text>
                </Flex>
              </>
            )}
            {/* // Prof */}
            {status == "prof" && (
              <>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("classes")}
                  {...(selected == "classes" && selectedStyle)}
                >
                  <Box as={ChalkboardTeacher} mx="auto" size={linkSize} />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Classes
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("rechercher")}
                  {...(selected == "rechercher" && selectedStyle)}
                >
                  <Box as={MagnifyingGlass} mx="auto" size={linkSize} />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Rechercher
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("profil")}
                  {...(selected == "profil" && selectedStyle)}
                >
                  <Box as={UserCircle} mx="auto" size={linkSize} />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Profil
                  </Text>
                </Flex>
              </>
            )}
            {/* // Etudiant */}
            {status == "etudiant" && (
              <>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("rechercher")}
                  {...(selected == "rechercher" && selectedStyle)}
                >
                  <Box as={MagnifyingGlass} mx="auto" size={linkSize} />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Rechercher
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("profil")}
                  {...(selected == "profil" && selectedStyle)}
                >
                  <Box as={UserCircle} mx="auto" size={linkSize} />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Profil
                  </Text>
                </Flex>
              </>
            )}
            {/* // Etudiant */}
            {status == "visiteur" && (
              <>
                <Flex
                  justifyContent="center"
                  flexDir="column"
                  textAlign="center"
                  cursor="pointer"
                  _hover={hoverStyle}
                  onClick={() => handleNavigate("rechercher")}
                  {...(selected == "rechercher" && selectedStyle)}
                >
                  <Box as={MagnifyingGlass} mx="auto" size={linkSize} />
                  <Text mt={linkMarginTop} fontSize="xs">
                    Rechercher
                  </Text>
                </Flex>
              </>
            )}
          </VStack>
        )}
      </Flex>
      <Box
        w="calc(100% - 100px)"
        h="calc(100vh - 20px)"
        bg="white"
        color="primary.500"
        rounded="40px"
        m="10px 10px 10px 0"
        px="45px"
        py="30px"
      >
        <Outlet />
      </Box>
    </Flex>
  );
}
