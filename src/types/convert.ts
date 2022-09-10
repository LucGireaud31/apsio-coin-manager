import { ClasseWaves, ClasseType } from '../classes.types';
import { IData, IProfilData } from './data';
export function convertDataToProfil(data:IData[]){
    let result:IProfilData = {
        firstName: data.find(d=>d.key == "prenom")?.value ?? "Inconnu",
        lastName: data.find(d=>d.key == "nom")?.value ?? "Inconnu",
        mail:  data.find(d=>d.key == "mail")?.value ?? "Inconnu",
        status:(data.find(d=>d.key == "status")?.value ?? "visiteur") as "visiteur" | "prof"|"admin"|"etudiant"
    }
    if(result.status == "prof"){
        result.isInClass = data.find((e) => e.key == "estEnCours")?.value == "true"
        result.teacherClasses = data.filter((e) => e.key.includes("_")) ?? []
    }
    if(result.status == "etudiant"){
        result.nbClasses = parseInt(data.find((e) => e.key == "totalCours")?.value ?? "0")
        result.presents = parseInt(data.find((e) => e.key == "presences")?.value ?? "0")
    }
    return result;
}

export function convertClasseWaves(classeWaves: ClasseWaves): ClasseType {
    const students: string[] = JSON.parse(classeWaves.value).students;
  
    return {
      key: classeWaves.key,
      type: classeWaves.type,
      value: { students: students },
    };
  }
  
  export function convertStudentsTextToJson(text: string): string {
    var result = "[";
    /*if (text != "") {
      var first = true;
      const addresses: string[] = text.replaceAll("\n", " ").split(" ");
      addresses.map((a: string) => {
        if (!first) {
          result += ",";
        }
        result += `"${a}"`;
        first = false;
      });
    }*/
    return result + "]";
  }