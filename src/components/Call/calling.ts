import { StudentType } from "./../../classes.types";

export function getCurrentClass():string{
  return "APSIO_hzbvivbn"
}

export async function calling(
  userAddress: string,
  classe: string,
  studentsAddressesAbsents: string[],
  students: StudentType[]
) {
  const isAbsent = "absent";
  const isPresent = "présent";

  const values: { type: "string"; value: string }[] = [];

  students.forEach((student: StudentType) => {
    const value = `${student.address}_${
      studentsAddressesAbsents.includes(student.address) ? isAbsent : isPresent
    }`;
    values.push({type:"string",value:value})
  });

  const txData = {
    type: 16,
    data: {
      fee: {
        amount: 500000,
        assetId: null,
      },
      dApp: userAddress,
      call: {
        function: "faireAppelEleve",
        args: [
          { type: "string", value: classe },
          { type: "list", value: values },
        ],
      },
      payment: [],
    },
  };
  console.log(txData);
  // @ts-ignore
  if (ApsioKeeper) {
    // @ts-ignore
    return ApsioKeeper.signAndPublishTransaction(txData);
  }
  return null;
}
