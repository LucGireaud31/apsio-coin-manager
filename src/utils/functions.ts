export function capitalize(str:string){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isEmpty<T>(list:T[] | undefined){
    return !list || list.length == 0;
}

export async function sleep(time:number){
    return await new Promise((r) => setTimeout(r, time));
}
