export const getElementById = (id:string,array:object[])=>{
    if (!Array.isArray(array)) {
        throw new Error('Второй аргумент должен быть массивом объектов');
    }
    type ObjectType = {
        [key: string]: any;
    }
    return array.filter((element:ObjectType)=>{
        if (
            Object.keys(element).includes('id')&&
            element.id===id
        ) {
            return element;
        } else {
            return false;
        }
    });
}