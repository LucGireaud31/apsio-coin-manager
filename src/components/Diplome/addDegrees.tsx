import {
  Flex,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Spinner,
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { stringToBytes } from "@waves/ts-lib-crypto";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getStudents, getDatas, getMultipleDatas } from "../../api";
import { StudentType } from "../../classes.types";
import { usePublicKey } from "../../hooks/usePublicKey";
import { createDegrees, sendDegrees } from "./manageNFT";

export function AddDegree() {
  const { className } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoading: isLoadingData, data } = useQuery([className, "data"], () =>
    window.localStorage.getItem("class") == className ? getMultipleDatas(JSON.parse(window.localStorage.getItem("students") ?? "[]")) : undefined
  );

  const [students, setStudents] = useState<StudentType[]>([]);
  const [studentsWithDegree, setStudentsWithDegree] = useState<StudentType[]>(
    []
  );
  const keyAddress = usePublicKey();
  const [files, setFiles] = useState<{ address: string; file: File }[]>([]);

  useEffect(() => {
    (async () => {
      if (data != undefined && keyAddress != "") {
        setStudents(data.map(d => {
          

          return {
            address: d.find(d=>d.key=="address")?.value ?? "",
            firstName: d.find(d=>d.key=="prenom")?.value ?? "",
            lastName: d.find(d=>d.key=="nom")?.value ?? "",
            mail: d.find(d=>d.key=="mail")?.value ?? "",
          }
        }))
      }
    })()
  }, [data, keyAddress]);

  function handleUpload() {
    var tempStudents: StudentType[] = [];

    files.forEach((file) => {
      if (file) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file.file);

        fileReader.onload = async function () {
          const res = await axios.post(
            "http://localhost:3001/api/add",
            {
              fileName: file.file.name,
              degree: btoa(fileReader.result as string),
            },
            { headers: { "content-type": "application/json","mode":"no-cors" } }
          );
          const newStudent = {
            ...students.find((s) => s.address == file.address)!,
            degreeAdress: res.data,
          };
          tempStudents.push(newStudent);
          setStudentsWithDegree(tempStudents);
        };
      }
    });
  }

  useEffect(() => {
    if (
      studentsWithDegree.length > 0 &&
      studentsWithDegree.length == files.length
    ) {
      createDegrees(studentsWithDegree, className!);
    }
  }, [studentsWithDegree]);

  return (
    <Flex w="full" color="primary.500" justifyContent="center">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Envoyer les Diplômes
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex>Attention, cette action est irréversible</Flex>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose;
                  sendDegrees();
                }}
                ml={3}
              >
                Envoyer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box textAlign="center" mt="50px">
        <Heading mb="70px">
          Ajouter des diplomes de la classe de {className}
        </Heading>
        {isLoadingData ? (
          <Spinner thickness="5px" speed="0.5s" color="primary.500" size="xl" />
        ) : (
          <>
            <VStack w="350px" spacing="25px" m="0px auto 50px auto">
              {students.length == 0 ? (
                <Text>Aucun étudiant</Text>
              ) : (
                students.map((student: StudentType, index: number) => (
                  <Flex alignItems="center" key={student.address}>
                    <Text mr="50px">
                      {student.firstName} {student.lastName}{" "}
                    </Text>
                    <input
                      ref={inputRef}
                      type="file"
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          const file = {
                            address: student.address,
                            file: event.currentTarget.files[0],
                          };
                          setFiles([
                            ...[...files].filter(
                              (f) => f.address != student.address
                            ),
                            file,
                          ]);
                        }
                      }}
                    />
                  </Flex>
                ))
              )}
            </VStack>
            {students.length != 0 && (
              <VStack>
                <Button
                  bgColor="primary.500"
                  color="white"
                  w="250px"
                  onClick={handleUpload}
                >
                  Créer les diplômes
                </Button>
                <Button
                  bgColor="primary.500"
                  color="white"
                  w="250px"
                  mt="25px"
                  onClick={() => setIsOpen(true)}
                >
                  Envoyer les diplômes
                </Button>
              </VStack>
            )}
          </>
        )}
      </Box>
    </Flex>
  );
}
