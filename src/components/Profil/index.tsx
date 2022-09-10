import {
  Center,
  Grid,
  Heading,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getDatas, getDegrees } from "../../api";
import { useMemo } from "react";
import { Card } from "../ui/Card";
import { convertDataToProfil } from "../../types/convert";
import { Summary } from "./Summary";
import { ClassesWithStudents } from "./ClassesWithStudents";

interface Props {
  address?: string;
}

export function Profil({ address }: Props) {
  const { isLoading, data: profil } = useQuery<any[]>(["profil", address], () =>
    getDatas(address)
  );
  const { isLoading: isLoadingDegrees, data: degrees } = useQuery<any[]>(
    ["degrees", address],
    () => getDegrees(address)
  );

  const profilData = useMemo(() => {
    if (!profil) return null;
    return convertDataToProfil(profil)
  }, [profil])

  return (
    <>
      {address == undefined &&
        <Heading size="md" h="50px" mb="30px">
          Mon profil
        </Heading>}
      <Grid
        templateColumns="repeat(2,1fr)"
        h="calc(100vh - 80px - 50px - 30px)"
        w="full"
        gap={6}
      >
        <Card
          title=""
          animationName=""
        >
          {isLoading || !profilData || isLoadingDegrees || !degrees ? (
            <Spinner mx="auto" colorScheme="primary" size="lg" mt="30px" />
          ) : (
            <VStack spacing={8} color="primary.500" w="full">
              <>
                <Summary profilData={profilData} degrees={degrees} />

                {profilData.status == "prof" && (
                  <ClassesWithStudents profilData={profilData} />
                )}
              </>
            </VStack>

          )}
        </Card>
      </Grid>

    </>
  );
}
