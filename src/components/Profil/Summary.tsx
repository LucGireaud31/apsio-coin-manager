import { ViewIcon } from "@chakra-ui/icons";
import { Heading, VStack, Text, Image, HStack, Badge, Box, Flex, Modal, ModalOverlay, ModalContent, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { IProfilData } from "../../types/data";
import { MiniCard } from "../ui/MiniCard";

interface Props {
    profilData: IProfilData
    degrees: any[]
}

export function Summary({ profilData, degrees }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUrl, setSelectedUrl] = useState("");

    async function handleDegreeClick(degree: any) {
        if ((degree.description as string)[0] === "{") {
            const response = await fetch(JSON.parse(degree.description).link);
            const url = await response.text();
            setSelectedUrl(url);
        } else {
            setSelectedUrl("");
        }
        onOpen();
    }

    return <MiniCard textAlign="center" bg="primary.100" py={5} px={10}>
        {profilData.status == "visiteur" ? (
            <Heading>Adresse inconnue</Heading>
        ) : (
            <>
                <VStack>
                    <HStack spacing="10px">
                        <Text fontWeight="bold">
                            {profilData.firstName}
                        </Text>
                        <Text fontWeight="bold">
                            {profilData.lastName}
                        </Text>
                    </HStack>
                    <Text>{profilData.lastName}</Text>
                    <HStack spacing="25px">
                        <HStack spacing="8px">
                            <Text>Statut :</Text>
                            <Text fontWeight="bold">
                                {profilData.status}
                            </Text>
                        </HStack>
                        {profilData.status == "prof" && (
                            <HStack spacing="8px" alignItems="center">
                                <Text>Est en cours :</Text>
                                {profilData.isInClass ? (
                                    <Badge colorScheme="red">Oui</Badge>
                                ) : (
                                    <Badge colorScheme="green">Non</Badge>
                                )}
                            </HStack>
                        )}
                        {profilData.status ==
                            "etudiant" && (
                                <>
                                    <Text>Présences : </Text>
                                    {profilData.presents ? (
                                        <Text>
                                            {profilData.presents}
                                            /
                                            {
                                                profilData.nbClasses
                                            }
                                        </Text>
                                    ) : (
                                        <Text>0/0</Text>
                                    )}
                                </>
                            )}
                    </HStack>
                </VStack>
                {profilData.status == "etudiant" && (
                    <>
                        <Text fontWeight="bold" mt="20px" mb="5px">
                            Diplômes :
                        </Text>
                        <Box border="1px solid" p="20px" rounded="lg">
                            {degrees.length == 0 && <Text>Aucun diplôme</Text>}
                            {degrees.map((degree) => (
                                <Flex
                                    key={degree.description}
                                    alignItems="center"
                                    mx="auto"
                                    w="fit-content"
                                    onClick={() => handleDegreeClick(degree)}
                                    cursor="pointer"
                                >
                                    <ViewIcon mr="10px" />
                                    <Text>{degree.name}</Text>

                                    <Modal
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        motionPreset="scale"
                                        size="4xl"
                                    >
                                        <ModalOverlay />
                                        <ModalContent>
                                            {selectedUrl == "" ? (
                                                <Text>
                                                    Erreur pendant l'affichage du diplôme
                                                </Text>
                                            ) : (
                                                <Image
                                                    src={selectedUrl}
                                                    h="full"
                                                    w="full"
                                                />
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </Flex>
                            ))}
                        </Box>
                    </>
                )}
            </>
        )}
    </MiniCard>
}