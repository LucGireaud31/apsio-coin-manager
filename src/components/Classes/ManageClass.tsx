import {
  Input,
  VStack,
  Button,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getClasseStudents, getStudents } from "../../api";
import { StudentType } from "../../classes.types";
import { Card } from "../ui/Card";
import { useNavigate, useParams } from "react-router";
import { Select } from "chakra-react-select";
import { X } from "phosphor-react";
import { capitalize, isEmpty, sleep } from "../../utils/functions";
import { handleCreateClasse } from "../Classe/handleUserActions";
import Swal from "sweetalert2";

interface Props {
  type: "add" | "modify";
}

export function ManageClass({ type }: Props) {
  const { className } = useParams();

  // States
  const [keyAddress, setKeyAddress] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState(className ?? "");
  const [inputSelectValue, setInputSelectValue] = useState("");
  const [animationName, setAnimationName] = useState<string | undefined>(
    "animate__bounceInLeft"
  );

  const [students, setStudents] = useState<StudentType[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setStudents(await getStudents());
      // @ts-ignore
      const userAddress = (await ApsioKeeper.publicState()).account.address;
      setKeyAddress(userAddress);

      if (type == "modify") {
        setSelectedStudents(await getClasseStudents(className!, userAddress));
      }

      setIsLoading(false);
    })();
  }, []);

  async function onClose() {
    setIsOpen(false);
    await sleep(500);
    navigate("..");
  }

  function handleSave() {
    if (inputValue == "") {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "La classe doit avoir un nom",
      });
      return;
    }
    if (isEmpty(selectedStudents)) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Il faut au moins 1 étudiant dans une classe",
      });
      return;
    }

    // Form valid
    handleCreateClasse(keyAddress, inputValue, JSON.stringify(selectedStudents))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: `${inputValue} ${type == "add" ? "ajoutée" : "modifiée"}`,
        });
        navigate("..");
      })
      .catch((err) => {
        Swal.fire({
          icon: "success",
          title: "Erreur inconnue",
          text: err,
        });
      });
  }

  const isClassNameInvalid = inputValue.includes("_");

  return (
    <Card
      title={type == "add" ? "Ajouter une classe" : `Modifier ${className}`}
      animationTimeout={200}
      isOpen={isOpen}
      animationName={animationName}
      animationDuration={500}
      rightComponent={
        <IconButton
          aria-label="back"
          bg="none"
          colorScheme="gray"
          color="primary.500"
          onClick={() => {
            setAnimationName("animate__bounceOutRight");
            onClose();
          }}
          icon={<X size={32} />}
        />
      }
    >
      <VStack mx="auto" align="lefts" mt="10px" w="70%" spacing="30px">
        <FormControl isInvalid={isClassNameInvalid} isRequired>
          <FormLabel>Nom de la classe</FormLabel>
          <Input
            id="name"
            disabled={type == "modify"}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder="Nom de classe"
            borderColor="primary.500"
          />
          {isClassNameInvalid && (
            <FormErrorMessage>
              La nom de la classe ne doit pas contenir le caractère "_"
            </FormErrorMessage>
          )}
        </FormControl>
        <Box>
          <FormLabel>Etudiants</FormLabel>
          {isLoading && (
            <Center>
              <Spinner colorScheme="primary" size="lg" mt="30px" />
            </Center>
          )}
          {!isLoading && (
            <Select
              inputValue={inputSelectValue}
              onInputChange={(newInput) => setInputSelectValue(newInput)}
              placeholder="Rechercher"
              isMulti
              options={students.map((student) => {
                return {
                  label: `${capitalize(
                    student.firstName
                  )} ${student.lastName.toUpperCase()}`,
                  value: student.address,
                };
              })}
              defaultValue={students
                .filter((s) => selectedStudents.includes(s.address))
                .map((s) => {
                  return {
                    label: `${capitalize(
                      s.firstName
                    )} ${s.lastName.toUpperCase()}`,
                    value: s.address,
                  };
                })}
              noOptionsMessage={() => (
                <Text>
                  Pas de résultat pour{" "}
                  <Text as="span" fontWeight="bold">
                    "{inputSelectValue}"
                  </Text>
                </Text>
              )}
              onChange={(newValues) =>
                setSelectedStudents(newValues.map((v) => v.value))
              }
            />
          )}
        </Box>
        <Button w="full" onClick={handleSave}>
          {type == "add" ? "Valider" : "Modifier"}
        </Button>
      </VStack>
    </Card>
  );
}
