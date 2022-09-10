import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Classes } from "./components/Classes";
import { Layout } from "./components/ui/Layout";
import { Profil } from "./components/Profil";
import { Rechercher } from "./components/Rechercher";
import { Call } from "./components/Call";
import { QueryClient, QueryClientProvider } from "react-query";
import { Admin } from "./components/Admin";
import { ClassesDegree } from "./components/Diplome";
import { AddDegree } from "./components/Diplome/addDegrees";
import { theme } from "./style/theme";
import { useEffect, useState } from "react";
import { getDatas } from "./api";
import { NotFound } from "./components/404NotFound";
import "animate.css";
import "sweetalert2/src/sweetalert2.scss";
import { ManageClass } from "./components/Classes/ManageClass";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const [status, setStatus] = useState<
    "etudiant" | "prof" | "admin" | "visiteur" | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log("ouis");
        const datas = await getDatas();
        if (datas && datas.find((e: any) => e.key == "status")) {
          setStatus(
            datas.find((e: any) => e.key == "status")?.value as
              | "etudiant"
              | "prof"
              | "admin"
              | "visiteur"
          );
        }
      } catch (err) {
        setStatus("visiteur"); // No waves keeper
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {!isLoading && (
        <>
          {/* // Status null */}
          {status == null && (
            <Heading color="red">
              Erreur, téléchargez l'extension Apsio Keeper, connectez-vous et
              réessayez svp.
            </Heading>
          )}
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                {/* // Status admin */}
                {status == "admin" && (
                  <>
                    <Route path="/*" element={<NotFound />} />
                    <Route path="" element={<Layout status={status} />}>
                      <Route index element={<Home />} />
                      <Route path="profil" element={<Profil />} />
                      <Route path="admin" element={<Admin />} />
                      <Route path="rechercher" element={<Rechercher />} />
                      <Route path="degrees" element={<ClassesDegree />}>
                        <Route path=":className" element={<AddDegree />} />
                      </Route>
                    </Route>
                  </>
                )}
                {/* // Status prof */}
                {status == "prof" && (
                  <>
                    <Route path="/*" element={<NotFound />} />
                    <Route path="" element={<Layout status={status} />}>
                      <Route index element={<Home />} />
                      <Route path="classes" element={<Classes />}>
                        <Route
                          path="ajouter"
                          element={<ManageClass type="add" />}
                        />
                        <Route
                          path=":className/modifier"
                          element={<ManageClass type="modify" />}
                        />
                        <Route path=":className/appel" element={<Call />} />
                      </Route>
                      <Route path="profil" element={<Profil />} />
                      <Route path="rechercher" element={<Rechercher />} />
                    </Route>
                  </>
                )}
                {/* // Status etudiant */}
                {status == "etudiant" && (
                  <>
                    <Route path="/*" element={<NotFound />} />
                    <Route path="" element={<Layout status={status} />}>
                      <Route index element={<Home />} />
                      <Route path="profil" element={<Profil />} />
                      <Route path="rechercher" element={<Rechercher />} />
                    </Route>
                  </>
                )}
                {/* // Status etudiant */}
                {status == "visiteur" && (
                  <>
                    <Route path="/*" element={<NotFound />} />
                    <Route path="" element={<Layout status={status} />}>
                      <Route index element={<Home />} />
                      <Route path="rechercher" element={<Rechercher />} />
                    </Route>
                  </>
                )}
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </>
      )}
    </ChakraProvider>
  );
}
