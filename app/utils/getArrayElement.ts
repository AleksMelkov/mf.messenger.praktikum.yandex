export const getArrayElement = (data:Record<string, any>[],key:string,value:string) => {
    return data.filter((item)=>{
         return  item[key] === value;
    })
}