import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spinner, VStack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Outlet } from "react-router";
import { getDatas } from "../../api";
import {
  ClasseType,
  ClasseWaves,
  convertClasseWaves,
} from "../../classes.types";

export function ClassesDegree() {
  const {
    isLoading,
    data,
    refetch,
    isRefetching,
  } = useQuery<ClasseWaves[]>(["user_data"], () => getDatas());

  const [classes, setClasses] = useState<ClasseType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (data) {
        const tempClasses: ClasseType[] = [];
        const teacherAddresses: string[] = JSON.parse(data.find((d) => d.key == "prof")?.value ?? "[]");

        teacherAddresses.forEach(async (t) => {
          const teacherdata = await getDatas(t);

          await Promise.all(teacherdata.map(async (data) => {
            if (data.key.split("_").length > 1) {
              tempClasses.push(convertClasseWaves(data));
            }
          }))

          setClasses(tempClasses);
        })
      }
    })()
  }, [data]);

  return (
    <Flex w="full" color="primary.500">
      <Box minW="600px" h="full" boxShadow={"2px 0px 5px black"}>
        <Flex pt="50px" mb="50px" alignItems="center" justifyContent="center">
          <Text color="primary.500" pl="20px">
            Rafraichir
          </Text>
          <RepeatIcon
            ml="10px"
            w={8}
            h={8}
            color="primary.500"
            sx={{
              _hover: { cursor: "pointer" },
            }}
            onClick={() => refetch()}
          />
        </Flex>
        <VStack spacing="50px">
          {isLoading || classes == [] || isRefetching ? (
            <Spinner
              thickness="5px"
              speed="0.5s"
              color="primary.500"
              size="xl"
            />
          ) : (
            <>
              {classes.length == 0 && (
                <Text>Aucune classe enregistrée pour ce compte</Text>
              )}
              {classes.map((classe: ClasseType) => (
                <VStack
                  key={classe.key}
                  border="1px solid"
                  p="20px"
                  rounded="10px"
                  minW="250px"
                  verticalAlign="center"
                >
                  <Flex>
                    <Text fontWeight="bold" mr="20px">
                      {classe.key.split("_")[0]}
                    </Text>
                    <Text>

                      {classe.value.students.length} étudiant
                      {classe.value.students.length > 0 && "s"}
                    </Text>
                  </Flex>
                  <Button
                    mr="auto"
                    bgColor="primary.500"
                    color="white"
                    onClick={() => {
                      window.localStorage.setItem("students",JSON.stringify(classe.value.students));
                      window.localStorage.setItem("class",classe.key.split("_")[0]);
                      navigate(classe.key.split("_")[0])}}
                  >
                    Emettre diplome
                  </Button>
                </VStack>
              ))}
            </>
          )}
        </VStack>
      </Box>
      <Box h="full" w="full">
        <Outlet />
      </Box>
    </Flex>
  );
}
