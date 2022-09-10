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

export interface ClasseWaves {
  key: string;
  type: string;
  value: string;
}
export interface StudentType {
  address: string;
  firstName: string;
  lastName: string;
  mail: string;
  degreeAdress? : string;
}
export interface TeacherType{
  address:string,
  name:string
}

export interface ClasseType {
  key: string;
  type: string;
  value: { students: string[] };
}

export interface ModalData {
  classeName: string;
  students: string[];
}
