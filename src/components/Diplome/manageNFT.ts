import { address } from "@waves/ts-lib-crypto";
import { useToast } from "@chakra-ui/react";
import { StudentType } from "./../../classes.types";
import { getDegrees } from "../../api";
export function burnNFT(tokenId: string) {
  const txData = {
    type: 6,
    data: {
      amount: 1,
      assetId: tokenId,
      fee: {
        tokens: "0.001",
        assetId: "WAVES",
      },
    },
  };
  // @ts-ignore
  if (ApsioKeeper) {
    // @ts-ignore
    ApsioKeeper.signAndPublishTransaction(txData).catch((error: any) => {
      console.log(error);
    });
  }
}

export async function createDegrees(students: StudentType[],classe:string) {
  console.log(students)
  students.forEach((student) => {
    // @ts-ignore
    ApsioKeeper.signAndPublishTransaction({
      type: 3,
      data: {
        name: `Diplôme ${student.firstName}`,
        description: JSON.stringify({owner:student.address,link:student.degreeAdress}),
        quantity: 1,
        precision: 0,
        reissuable: false,
        decimals: 0,
        fee: {
          tokens: "0.01",
          assetId: "WAVES",
        },
      },
    })
  });
}

export async function sendDegrees() {
  const degrees: any[] = await getDegrees();
  degrees.forEach((degree) => {
    // @ts-ignore
    ApsioKeeper.signAndPublishTransaction({
      type: 4,
      data: {
        recipient: JSON.parse(degree.description).owner,
        amount: { tokens: "1", assetId: degree.assetId },
        fee: { tokens: "0.001", assetId: "WAVES" },
      },
    }).catch((error: any) => console.log(error));
  });
}
