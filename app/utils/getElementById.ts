//Функция для поиска элемента массива объектов.
//В проекте используется для поиска конкретного чата по id в массиве.
export const getElementById = (id:string,array:object[])=>{
    if (!Array.isArray(array)) {
        throw new Error('Второй аргумент должен быть массивом объектов');
    }
    return array.filter((element:Record<string, any>)=>{
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