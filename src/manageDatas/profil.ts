import { data, setScript, transfer } from "@waves/waves-transactions";
import { addBroadcast, getStudentsAddresses } from "../api";
import { DataTransactionEntry } from "@waves/ts-types/src";
import { userSeed } from "../userSeedTemp";
import { scriptStudent, scriptTeacher } from "../../smartContracts";
import { sleep } from "../utils/functions";

export async function setAccount(
  newSeed: string,
  newAddress: string,
  firstName: string,
  lastName: string,
  mail: string,
  status: "etudiant" | "prof" | "admin"
) {
  console.log(newAddress, newSeed);
  // Ajout de waves
  const data1 = transfer(
    { amount: 5_000_000, recipient: newAddress },
    userSeed
  );
  await addBroadcast(data1);

  // Attente de 5 secondes le temps que la blockchain se mette à jour
  await sleep(5_000)

  // Ajout des données de profil
  // @ts-ignore
  const account = (await ApsioKeeper.publicState()).account;

  var profilDatas: DataTransactionEntry[] = [
    { key: "prenom", type: "string", value: firstName },
    { key: "nom", type: "string", value: lastName },
    { key: "mail", type: "string", value: mail },
    { key: "status", type: "string", value: status },
  ];

  if (status == "prof") {
    profilDatas.push({
      key: "validatorNode",
      type: "string",
      value: "3Mxv6Dpa1qRuyQBRFg3GwUaf3rcjHqWwNmC",
    }); // L'adresse d'une node validatrice
    profilDatas.push({ key: "estEnCours", type: "string", value: "false" });
    profilDatas.push({ key: "admin", type: "string", value: account.address });

  } else if (status == "etudiant") {
    profilDatas.push({
      key: `professeur_${account.address}`,
      type: "string",
      value: account.name,
    });
  } else {
    // Admin
    profilDatas.push({
      key: "validatorNode",
      type: "string",
      value: "3Mxv6Dpa1qRuyQBRFg3GwUaf3rcjHqWwNmC",
    }); // L'adresse d'une node validatrice
    profilDatas.push({ key: "estEnCours", type: "string", value: "false" });
  }

  const data3 = data({ data: profilDatas, chainId: "T" }, newSeed);
  await addBroadcast(data3);

  await sleep(5_000)

  // Ajout du smart contract
  const script = () => {
    if (status == "etudiant") {
      return scriptStudent;
    }
    return scriptTeacher;
  };
  const data2 = setScript({ script: script(), chainId: "T" }, newSeed);
  await addBroadcast(data2);

  //Ajout de l'étudiant dans la liste de l'utilisateur
  addNewStudent(userSeed, newAddress);
}
async function addNewStudent(userSeed: string, newAddress: string) {
  const addresses: string[] = await getStudentsAddresses();
  addresses.push(newAddress);
  const studentsData: DataTransactionEntry[] = [
    { key: "etudiants", type: "string", value: JSON.stringify(addresses) },
  ];
  const studentsBroadcast = data({ data: studentsData, chainId: 84 }, userSeed);
  console.log(studentsBroadcast);
  await addBroadcast(studentsBroadcast);
}