export interface IData{
    key:string,
    type:string,
    value:string,
}

export interface IProfilData{
    firstName:string,
    lastName:string,
    mail:string,
    status:"prof" | "etudiant" | "admin" | "visiteur",
    teacherClasses? : IData[],
    isInClass?:boolean,
    presents?:number,
    nbClasses?:number,
}
