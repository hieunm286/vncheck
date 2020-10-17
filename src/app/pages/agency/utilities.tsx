export const getCodeFromName = (arr: any[], name: string): number => {
  const index: number = arr.findIndex(el => el.name === name);
  if (index === -1) return 10;
  return arr[index].code;
};

export const getNameFromCode = (arr: any[], code: number | string) => {
  const index: number = arr.findIndex(el => el.code === code);
  if (index === -1) return '';
  return arr[index].name;
};
