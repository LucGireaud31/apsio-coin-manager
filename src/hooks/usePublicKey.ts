import { useEffect, useState } from "react";

export function usePublicKey() {
  const [key, setKey] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      // @ts-ignore
      setKey((await ApsioKeeper.publicState()).account.address);
    })();
  }, []);
  return key;
}
