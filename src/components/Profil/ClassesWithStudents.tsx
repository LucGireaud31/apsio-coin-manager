import { Grid, GridItem, Text, Thead, Tr, Th, Tbody, Td, Table, Spinner, Box, Flex, VStack, Divider, Button, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getClassesDetails } from "../../api";
import { IClassDetail } from "../../types/class";
import { IProfilData } from "../../types/data";
import { isEmpty } from "../../utils/functions";
import { MiniCard } from "../ui/MiniCard";

interface Props {
    profilData: IProfilData
}

export function ClassesWithStudents({ profilData }: Props) {

    const [classes, setClasses] = useState<IClassDetail[]>();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        (async () => {
            setClasses(await getClassesDetails(profilData.teacherClasses ?? []))
            setIsLoading(false)
        })()
    }, [])

    return <>
        {isEmpty(profilData.teacherClasses) ? (
            <Text>Aucune classe</Text>
        ) : (
            <MiniCard title="Liste des classes" animationTimeOut={300} w="full">
                {(isLoading || !classes) && <Center><Spinner mx="auto" colorScheme="primary" size="lg" mt="30px" /></Center>}
                {!isLoading && classes &&

                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        mt="0px"
                        maxH="500px"
                        overflowY="auto"
                        gap={5}
                        p={5}
                    >
                        {classes.map((classe) => (
                            <Box key={classe.className} bg="#f9f9f9" rounded="lg" color="primary.500" textAlign="center">
                                <Text fontWeight="semibold" mb={2}>{classe.className}</Text>
                                <Divider />

                                <VStack maxH="200px" overflowY="auto" spacing={0}>
                                    {isEmpty(classe.students) ? (
                                        <Text>Aucun élève</Text>
                                    ) : (
                                        <>
                                            {classe.students.map(
                                                student => (
                                                    <Button key={student.address} bg="none" color="primary.500" w="full" rounded="lg" _hover={{ textColor: "white", bg: "primary.500" }}>{student.firstName} {student.lastName}</Button>
                                                )
                                            )}
                                        </>
                                    )}
                                </VStack>
                            </Box>
                        ))}

                    </Grid>
                }
            </MiniCard>
        )}
    </>
}