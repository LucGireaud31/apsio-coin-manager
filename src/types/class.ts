export interface IStudentType {
  address: string;
  firstName: string;
  lastName: string;
  mail: string;
  degreeAdress?: string;
}

export interface IClassType {
  key: string;
  type: string;
  value: { students: string[] };
}

export interface IModalData {
  classeName: string;
  students: string[];
}

export interface IClassDetail {
  className: string,
  students: IStudentType[]
}
