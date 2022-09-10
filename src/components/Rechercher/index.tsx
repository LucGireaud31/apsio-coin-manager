import {
  Spinner,
  Input,
  IconButton,
  VStack,
  Heading,
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useRef, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { getDatas } from "../../api";
import { Profil } from "../Profil";
import { Card } from "../ui/Card";
export function Rechercher() {
  const [address, setAddress] = useState<string | undefined>();

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  const requestAdressData = () => {
    setAddress(inputRef.current?.value);
  };

  return (
    <>
      <HStack w="fit-content" h="50px" spacing={0} mb="30px">
        <Heading size="md" w="400px" verticalAlign="center">
          Rechercher un compte
        </Heading>
          <Input
            ref={inputRef}
            placeholder="Adresse exemple : 3MzfaHTFgjznN8zniycq5PZxaenTjwcYLXf"
            focusBorderColor="primary.500"
            color="primary"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                inputRef.current?.blur();
                requestAdressData();
              }
            }}
          />
          <IconButton
            colorScheme="primary"
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={requestAdressData}
          />
      </HStack>

      {address && <Profil address={address} />}
    </>
  );
}
