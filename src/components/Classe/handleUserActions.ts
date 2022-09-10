import Swal from "sweetalert2";

export function handleDelete(keyAddress: string, name: string) {
  console.log(keyAddress, name);
  const txData = {
    type: 16,
    data: {
      fee: {
        amount: 500000,
        assetId: null,
      },
      dApp: keyAddress,
      call: {
        function: "deleteClass",
        args: [{ type: "string", value: name }],
      },
      payment: [],
    },
  };
  // @ts-ignore
  if (ApsioKeeper) {
    // @ts-ignore
    ApsioKeeper.signAndPublishTransaction(txData)
      .catch((error: any) => {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: error,
        });
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: `La classe ${name} à été supprimée`,
        });
      });
  }
}

export async function handleCreateClasse(
  keyAddress: string,
  key: string,
  students: string
) {
  const txData = {
    type: 16,
    data: {
      fee: {
        amount: 500000,
        assetId: null,
      },
      dApp: keyAddress,
      call: {
        function: "createOrModifyClass",
        args: [
          { type: "string", value: encodeURI(key) },
          { type: "string", value: `{"students":${students}}` },
        ],
      },
      payment: [],
    },
  };
  // @ts-ignore
  if (ApsioKeeper) {
    // @ts-ignore
    return ApsioKeeper.signAndPublishTransaction(txData);
  }
  return null;
}

export async function stopClass(keyAddress: string) {
  const txData = {
    type: 16,
    data: {
      fee: {
        amount: 500000,
        assetId: null,
      },
      dApp: keyAddress,
      call: {
        function: "arreterCours",
        args: [],
      },
      payment: [],
    },
  };
  // @ts-ignore
  if (ApsioKeeper) {
    // @ts-ignore
    return ApsioKeeper.signAndPublishTransaction(txData);
  }
  return null;
}
