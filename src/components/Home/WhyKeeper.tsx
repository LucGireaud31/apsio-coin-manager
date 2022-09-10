import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Check } from "phosphor-react";
import { Fragment } from "react";

export function WhyKeeper() {
  return <VStack align="left">
    <Card text="Ma clé privée est *sécurisée* par une extension à l'abri des *sites malveillants*" animationTimeOut={1500} />
    <Card text="En me *connectant* sur l'extension je le suis sur *tous* les sites utilisant la blockchain APSIO" animationTimeOut={1600} />
    <Card text="Je peux avoir *accès à mon solde* d'apsioCoin depuis *n'importe quelle page* web" animationTimeOut={1700} />
    <Card text="Une *mise en place rapide* à l'aide d'un *QrCode* et d'une application mobile *Apsio Wallet*" animationTimeOut={1800} />
  </VStack>
}

interface Props {
  text: string,
  animationTimeOut: number
}

function Card(props: Props) {

  const { text, animationTimeOut } = props;

  const textSplitted = text.split("*");
  let isBold = false;

  const textRes = textSplitted.map((text) => {
    isBold = !isBold
    return <Text fontWeight={isBold ? "normal" : "bold"}>{text}</Text>
  }
  )

  return <Flex alignItems="center" bg="green.100" p={2} rounded="3xl">
    <Box as={Check} bg="green.200" p={2} rounded="full" size={50} color="green" weight="bold" className="animate__animated animate__bounceIn" sx={{ animationDelay: `${animationTimeOut}ms` }} />
    <HStack ml={3} spacing={1}>
      {textRes.map((text, i) => (
        <Fragment key={i}>
          {text}
        </Fragment>
      ))}
    </HStack>
  </Flex>

}
