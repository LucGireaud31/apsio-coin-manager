import {
  Flex,
  Spinner,
  VStack,
  Text,
  Switch,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { getDatas, getStudents } from "../../api";
import { StudentType } from "../../classes.types";
import { usePublicKey } from "../../hooks/usePublicKey";
import { isEmpty, sleep } from "../../utils/functions";
import { alertCallingClass } from "../ui/Alert";
import { Card } from "../ui/Card";
import { calling } from "./calling";

export function Call() {
  const { className } = useParams();
  const navigate = useNavigate();

  // States
  const [animationName, setAnimationName] = useState<string | undefined>(
    "animate__bounceInLeft"
  );

  const { isLoading: isLoadingAllStudents, data: allStudents } = useQuery<
    StudentType[]
  >([className, "allStudents"], () => getStudents());

  const { isLoading: isLoadingData, data } = useQuery([className, "data"], () =>
    getDatas()
  );

  const [students, setStudents] = useState<StudentType[]>([]);
  const [absents, setAbsents] = useState<string[]>([]);

  const keyAddress = usePublicKey();

  useEffect(() => {
    if (data != undefined && allStudents != undefined && keyAddress != "") {
      const classe = data.find(
        (e: any) => e.key == `${className}_${keyAddress}`
      );

      const studentsAddresses: any = JSON.parse(classe!.value);

      let remainingStudentsTemp: StudentType[] = [];
      allStudents.forEach((element) => {
        if (!studentsAddresses.students.includes(element.address)) {
          remainingStudentsTemp.push(element);
        }
      });

      const studentsTemp: StudentType[] = allStudents.filter((s: StudentType) =>
        studentsAddresses.students.includes(s.address)
      );
      setStudents(studentsTemp);
    }
  }, [data, allStudents, keyAddress]);

  async function onClose() {
    await sleep(500);
    navigate("..");
  }

  async function handleSave() {
    alertCallingClass(absents.length).then((result) => {
      if (result.isConfirmed) {
        calling(keyAddress!, className!, absents, students)
          .then(() => {
            Swal.fire({ title: "Appel effectué", icon: "success" });
            navigate("..");
          })
          .catch(() => {
            Swal.fire({
              title: "Erreur",
              text: "L'appel n'a pas pu être effectué",
              icon: "error",
            });
          });
      }
    });
  }

  return (
    <Card
      title={`Faire l'appel de ${className}`}
      animationTimeout={200}
      isOpen
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
      overflowY="auto"
    >
      {isLoadingAllStudents ||
        isLoadingData ||
        (className == undefined && (
          <Spinner mx="auto" colorScheme="primary" size="lg" mt="30px" />
        ))}
      {!isLoadingAllStudents && (
        <>
          {isEmpty(students) && (
            <Text textAlign="center" w="full">
              Aucun élève dans cette classe
            </Text>
          )}
          {!isEmpty(students) && (
            <>
              <VStack w="fit-content" overflowY="auto" mx="auto">
                {students.sort().map((student: StudentType) => (
                  <Flex justifyContent="space-between" w="full">
                    <Switch
                      id={student.address}
                      display="flex"
                      alignItems="center"
                      mt="2px"
                      mr="20px"
                      colorScheme="red"
                      cursor="pointer"
                      sx={{
                        "[data-focus]": { boxShadow: "none !important" },
                      }}
                      onChange={(value: any) => {
                        if (value.target.checked) {
                          setAbsents([...absents, student.address]);
                        } else {
                          setAbsents(
                            absents.filter((s: string) => s != student.address)
                          );
                        }
                      }}
                    >
                      {student.lastName} {student.firstName}
                    </Switch>

                    <Text
                      w="80px"
                      fontWeight="bold"
                      {...(absents.includes(student.address) && {
                        color: "red",
                      })}
                    >
                      {absents.includes(student.address) ? "Absent" : "Présent"}
                    </Text>
                  </Flex>
                ))}
              </VStack>
              <Button mt="10px" mx="auto" h={10} onClick={handleSave}>
                Valider l'appel
              </Button>
            </>
          )}
        </>
      )}
    </Card>
  );
}
