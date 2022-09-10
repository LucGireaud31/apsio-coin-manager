import { IData } from './types/data';
import axios from "axios";
import { IClassDetail, IStudentType } from './types/class';

const api = "https://nodes-testnet.wavesnodes.com";

async function getUserAddress(): Promise<string> {
    // @ts-ignore
    const accountData = await ApsioKeeper.publicState();
    const keyAddress = accountData.account.address;
    return keyAddress;
}

export async function getDegrees(keyAddress?: string): Promise<any[]> {
  if (keyAddress == undefined) {
    keyAddress = await getUserAddress();
  }

  const { data } = await axios.get(api + `/assets/nft/${keyAddress}/limit/50`);
  return data;
}

export async function getMultipleDatas(addresses:string[]){
  const result: IData[][] = [];

  await Promise.all(addresses.map((async a=>{
    const res = await getDatas(a);
    result.push([...(await getDatas(a)),{key:"address",type:"string",value:a}])
  })))

  return result;
}

export async function getDatas(keyAddress?: string) {
  if (keyAddress == undefined) {
    keyAddress = await getUserAddress();
  }

  const { data } = await axios.get<IData[]>(api + "/addresses/data/" + keyAddress);
  return data;
}

export async function getClasseStudents(className:string,keyAddress:string){
  const data = await getDatas(keyAddress);
  const classData = data.find(d=>d.key==`${className}_${keyAddress}`);

  if(classData){
    return JSON.parse(classData.value).students;
  }
  return []
}

export async function getStudentsAddresses(): Promise<string[]> {
  const keyAddress = await getUserAddress();

  let { data:userdata } = await axios.get(api + "/addresses/data/" + keyAddress);

  const adminAddress = userdata.find((d:any)=>d.key == "admin").value;

  let { data } = await axios.get(api + "/addresses/data/" + adminAddress);
  let result: any[] = [];

  data.map((d: any) => {
    if (d.key == "etudiant") {
      if (d.value != "") {
        result = JSON.parse(d.value);
      } else {
        result = [];
      }
    }
  });

  return result;
}

export async function getClassesDetails(classesData:IData[]){
  let result:IClassDetail[] = [];

  await Promise.all(classesData.map(async classe=>{
    let classDetail:IClassDetail = {className:classe.key.split("_")[0],students:[]}
    const studentsAddresses:string[] | undefined = JSON.parse(classe.value).students;

    if(studentsAddresses){
      classDetail.students = await getStudents(studentsAddresses);
    }

    
    result.push(classDetail)
  }))

  return result;

}

export async function getStudents(studentAddresses?:string[]){

  const addresses: string[] = studentAddresses ?? await getStudentsAddresses();
  let students: IStudentType[] = [];

  for await (const address of addresses) {
    const studentData: any[] = await getDatas(address);
    if (
      studentData.length > 0 &&
      studentData.find((e: any) => e.key == "status").value == "etudiant"
    ) {
      const firstName = studentData.find((e: any) => e.key == "prenom").value;
      const lastName = studentData.find((e: any) => e.key == "nom").value;
      const mail = studentData.find((e: any) => e.key == "mail").value;
      const student: IStudentType = {
        address: address,
        firstName: firstName,
        lastName: lastName,
        mail: mail,
      };
      students.push(student);
    }
  }
  return students;
}

export async function addBroadcast(data: any) {
  await axios.post(api + "/transactions/broadcast", data);
}
