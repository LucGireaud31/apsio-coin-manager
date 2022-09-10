import {
  Flex,
  Text,
  Spinner,
  Heading,
  Grid,
  TableContainer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Button,
  SlideFade,
  Box,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  ClasseType,
  ClasseWaves,
  convertClasseWaves,
} from "../../classes.types";
import { Classe } from "../Classe";
import { Outlet, useNavigate } from "react-router";
import { getDatas } from "../../api";
import { Card } from "../ui/Card";
import { ArrowsClockwise } from "phosphor-react";
import { stopClass } from "../Classe/handleUserActions";
import { sleep } from "../../utils/functions";
import { usePublicKey } from "../../hooks/usePublicKey";

export function Classes() {
  const keyAddress = usePublicKey();
  const [animationClassRefresh, setAnimationClassRefresh] = useState("");

  // La classe en cours pour le prof
  const [currentClass, setCurrentClass] = useState<string | null>(null);

  let { isLoading, data, refetch } = useQuery<ClasseWaves[]>(["classes"], () =>
    getDatas()
  );

  const [classes, setClasses] = useState<ClasseType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setClassesWithData(data);
  }, [data]);

  async function handleRefresh() {
    setAnimationClassRefresh("animate__animated animate__rotateIn");
    sleep(500).then(() => setAnimationClassRefresh(""));

    const { data: dataRefetched } = await refetch();
    setClassesWithData(dataRefetched);
  }

  function setClassesWithData(classes: ClasseWaves[] | undefined) {
    if (classes) {
      var tempClasses: ClasseType[] = [];
      classes.map((c: ClasseWaves) => {
        if (c.key.split("_").length > 1) {
          tempClasses.push(convertClasseWaves(c));
        } else if (c.key == "classeEnCours") {
          setCurrentClass(c.value.split("_")[0]);
        }
      });
      setClasses(tempClasses);
    }
  }

  return (
    <>
      <Heading size="md" h="50px" mb="30px">
        Classes
      </Heading>
      <Grid
        templateColumns="repeat(2,1fr)"
        h="calc(100vh - 80px - 50px - 30px)"
        w="full"
        gap={6}
      >
        <Card
          title="Mes classes"
          bg="none"
          shadow="none"
          animationName="animate__zoomIn"
          rightComponent={
            <>
              {currentClass && (
                <Button
                  onClick={() => {
                    stopClass(keyAddress ?? "").then(() => {
                      setCurrentClass(null);
                    });
                  }}
                >
                  Mettre fin au cours de {currentClass}
                </Button>
              )}
            </>
          }
          leftComponent={
            <Tooltip label="Rafraichir" placement="top">
              <IconButton
                className={animationClassRefresh}
                style={{ animationDuration: "500ms" }}
                aria-label="refresh"
                rounded="full"
                p={1}
                icon={<ArrowsClockwise size={32} />}
                onClick={handleRefresh}
              />
            </Tooltip>
          }
          overflowY="auto"
        >
          {/* // Is loading */}
          {isLoading && (
            <Spinner mx="auto" colorScheme="primary" size="lg" mt="30px" />
          )}

          {/* // Is not loading */}
          {!isLoading && (
            <>
              {classes.length == 0 && (
                <Text textAlign="center" mt="30px">
                  Aucune classe pour ce compte
                </Text>
              )}
              {classes.length > 0 && (
                <TableContainer pt="20px" overflowY="auto">
                  <Table colorScheme="blackAlpha" size="sm">
                    <Thead position="sticky" top={-5} bg="white">
                      <Tr>
                        <Th w="200px">Nom</Th>
                        <Th>Nombre d'élèves</Th>
                        <Th textAlign="center">Faire l'appel</Th>
                        <Th textAlign="center" w="100px">
                          Actions
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {classes.map((classe: ClasseType) => (
                        <Tr key={classe.key}>
                          <Classe
                            keyClass={classe.key}
                            students={classe.value.students}
                            isInClass={currentClass == classe.key.split("_")[0]}
                          />
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
              <Button
                onClick={() => navigate("ajouter")}
                mt={10}
                w="fit-content"
                mx="auto"
              >
                Créer une classe
              </Button>{" "}
            </>
          )}
        </Card>
        <Outlet />
      </Grid>
    </>
  );
}
