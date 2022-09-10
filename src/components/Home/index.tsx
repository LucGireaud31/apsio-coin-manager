import { Grid, Heading, Flex } from "@chakra-ui/react";
import { Card } from "../ui/Card";
import { HowKeeper } from "./HowKeeper";
import { UsingSite } from "./UsingSite";
import { WhyKeeper } from "./WhyKeeper";

export function Home() {
  return (
    <>
      <Heading size="md" h="50px" mb="30px">
        APSIO Manager
      </Heading>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        h="calc(100vh - 90px - 40px - 30px)"
      >
        <Card
          title="Cas d'utilisation d'APSIO Manager"
          animationTimeout={200}
          animationName="animate__zoomIn"
          h="calc(100vh - 90px - 40px - 30px)"
          overflowY="auto"
          bgGradient="linear(to-br,primary.50,red.50)"
        >
          <UsingSite />
        </Card>
        <Flex flexDir="column" h="full">
          <Card
            h="calc((100vh - 90px - 40px - 30px - 24px) / 2)"
            animationName="animate__fadeInLeft"
            title="Pourquoi l'APSIO Keeper ?"
            animationTimeout={1000}

          >
            <WhyKeeper />
          </Card>
          <Card
            h="calc((100vh - 90px - 40px - 30px - 24px) / 2)"
            animationName="animate__fadeInLeft"
            title="Utilisation d'APSIO Keeper"
            mt={6}
            animationTimeout={1000}
          >
            <HowKeeper />
          </Card>
        </Flex>
      </Grid>
    </>
  );
}
