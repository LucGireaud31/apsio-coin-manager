import { Flex, Box, Td, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Note, Pencil, Trash } from "phosphor-react";
import { alertDeleteClass } from "../ui/Alert";

interface Props {
  keyClass: string;
  students: string[];
  isInClass: boolean;
}

const iconActionSize = 26;

export function Classe({ keyClass, students, isInClass }: Props) {
  const navigate = useNavigate();

  const [name, address] = keyClass.split("_");

  return (
    <>
      <Td>{name}</Td>
      <Td>{students.length}</Td>
      <Td>
        {isInClass && (
          <Tooltip label={`Classe en cours`} bg="gray.400">
            <Box as={Note} mx="auto" size={iconActionSize} color="gray.400" />
          </Tooltip>
        )}
        {!isInClass && (
          <Tooltip label={`Faire l'appel de ${name}`} bg="primary.500">
            <Box
              as={Note}
              onClick={() => {
                navigate(`${name}/appel`);
              }}
              mx="auto"
              size={iconActionSize}
              cursor="pointer"
              _hover={{ color: "primary.300" }}
            />
          </Tooltip>
        )}
      </Td>
      <Td>
        <Flex>
          <Tooltip label={`Modifier ${name}`} bg="orange">
            <Box
              as={Pencil}
              onClick={() => {
                navigate(`${name}/modifier`);
              }}
              mx="auto"
              size={iconActionSize}
              color="orange"
              cursor="pointer"
              _hover={{ color: "orange.300" }}
            />
          </Tooltip>
          <Tooltip label={`Supprimer ${name}`} bg="red">
            <Box
              as={Trash}
              mx="auto"
              size={iconActionSize}
              color="red"
              cursor="pointer"
              _hover={{ color: "red.300" }}
              onClick={() => alertDeleteClass(address, name)}
            />
          </Tooltip>
        </Flex>
      </Td>
    </>
  );
}
