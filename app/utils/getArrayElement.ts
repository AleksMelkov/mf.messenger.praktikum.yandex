export const getArrayElement = (
  data:Record<string, any>[],
  key:string,
  value:string,
):Record<string, any>[] => data.filter((item) => item[key] === value);
