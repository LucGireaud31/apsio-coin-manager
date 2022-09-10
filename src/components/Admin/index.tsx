import { Button, Flex, Grid, Heading, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { burnNFT } from "../Diplome/manageNFT";
import { Card } from "../ui/Card";
import { ExpandButton } from "./ExpandButton";
import { Form } from "./form";

export function Admin() {
  const { register, handleSubmit } = useForm();

  function handleCreate(data: any) {
    burnNFT(data.assetId);
  }

  return (
    <>
      <Heading size="md" h="50px" mb="30px">
        Administration
      </Heading>
      <Card title="" h="calc(100vh - 80px - 50px - 30px)" animationName="animate__zoomIn">
        <Grid templateColumns="repeat(4, 1fr)" gap={10}>
          <ExpandButton title="Ajouter un étudiant"> <Form status="etudiant" /></ExpandButton>
          <ExpandButton title="Ajouter un professeur"> <Form status="prof" /></ExpandButton>
          <ExpandButton title="Ajouter un administrateur"> <Form status="admin" /></ExpandButton>
          <ExpandButton title="Supprimer un NFT">
            <form onSubmit={handleSubmit(handleCreate)}>
              <VStack spacing="30px">
                <Input
                  placeholder="Asset id"
                  {...register("assetId")}
                  focusBorderColor="primary.500"
                />
                <Button
                  bgColor="primary.500"
                  type="submit"
                  color="white"
                  variant="ghost"
                  w="full"
                >
                  Supprimer le token
                </Button>
              </VStack>
            </form>
          </ExpandButton>
        </Grid>


      </Card>
    </>
  
  );
}
