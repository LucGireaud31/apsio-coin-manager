import { VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { randomSeed, address } from "@waves/ts-lib-crypto";
import { setAccount } from "../../manageDatas/profil";
import { useState } from "react";

interface Props {
  status: "etudiant" | "prof" | "admin" ;
}

export function Form({ status }: Props) {
  const { register, handleSubmit } = useForm();
  const [loading, setIsLoading] = useState(false);

  const toast = useToast()
  const toast_id = "toast_id";
  const toast_id_error = "toast_id_error";

  async function handleCreate(data: any) {
    if (data.firstName == "" || data.lastName == "" || data.eùail == "") {
      if (!toast.isActive(toast_id_error)) {

        toast({
          id: toast_id_error,
          title: "Erreur d'entrée",
          description: "Il faut saisir prénom/nom/mail",
          status: "error",
          duration: 3_000,
          isClosable: true,
        });
      }
      return;
    }
    setIsLoading(true);
    const seed = randomSeed();
    const addressNewUser: string = address(seed, "T");
    try {

      await setAccount(
        seed,
        addressNewUser,
        data.firstName,
        data.lastName,
        data.email,
        status
      );
      setIsLoading(false);
      if (!toast.isActive(toast_id)) {

        toast({
          id: toast_id,
          title: "Enregistré",
          description: "Utilisateur crée",
          status: "success",
          duration: 3_000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Erreur inconnue, veuillez réessayer dans quelques minutes svp",
        status: "error",
        duration: 5_000,
        isClosable: false,
      });
    }
  }


  return (
    <form onSubmit={handleSubmit(handleCreate)}>

      <VStack mt="50px" spacing="30px">
        <Input
          placeholder="Prénom"
          {...register("firstName")}
          focusBorderColor="primary.500"
        />
        <Input
          placeholder="Nom"
          {...register("lastName")}
          focusBorderColor="primary.500"
        />
        <Input
          placeholder="Email"
          {...register("email")}
          focusBorderColor="primary.500"
        />
        <Button
          isLoading={loading}
          bgColor="primary.500"
          type="submit"
          color="white"
          variant="ghost"
          w="full"
        >
          Créer
        </Button>
      </VStack>
    </form>
  );
}
