import { Box, Text, HStack, VStack, Heading, Flex, Grid, Center, BoxProps, GridItem } from "@chakra-ui/react";
import { Check, CheckCircle, DeviceMobileCamera, IconProps, Keyboard } from "phosphor-react";

export function HowKeeper() {
  return <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(2, 1fr)" h="full" textAlign="center">
    <Center>
      <LogoWithLegend logo={Keyboard} text="Créer votre mot de passe lors de votre 1ère connexion" />
    </Center>
    <VStack>
      <LogoWithLegend logo={DeviceMobileCamera} text="Scanner le QR à l'aide de l'application ApsioWallet" />
      <Text fontWeight="bold">OU</Text>
      <LogoWithLegend logo={Keyboard} text="Entrer votre clé privée (seed) à l'abri des regards" />
    </VStack>
    <Center>
      <LogoWithLegend logo={CheckCircle} logoStyle={{ color: "green" }} text="Vous êtes connecté à tous les sites utilisant l'APSIO" />
    </Center>

<GridItem colSpan={3} w="full">
  <Flex w="full"  justifyContent="space-around">

    <Step size={10} value={1} />
    <Step size={10} value={2} />
    <Step size={10} value={3} />
  </Flex>
</GridItem>

  </Grid>
}

interface LogoWithLegendProps {
  text: string,
  logo: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
  logoSize?: number
  logoStyle?: BoxProps
}

export function LogoWithLegend(props: LogoWithLegendProps) {
  const { text, logo, logoSize, logoStyle } = props;
  return <VStack w="200px" spacing={0}>
    <Box as={logo} size={logoSize ?? 50} weight="duotone" {...logoStyle} />
    <Text>{text}</Text>
  </VStack>
}

interface StepProps {
  size: number,
  value: number
}

export function Step(props: StepProps) {
  const { size, value } = props
  return <Flex justifyContent="center" pt={5}>

    <Flex bg="primary.500" rounded="full" h={size} w={size} color="white" justifyContent="center">
      <Text lineHeight={size}>{value}</Text>
    </Flex>
  </Flex>
}