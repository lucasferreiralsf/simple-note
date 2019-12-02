export const removeElementObject = (
  originalObject: object,
  keyNames: string[],
) => {
  const elementsRecuded: any = {};
  const objectReduced: any = {};
  Object.keys(originalObject).forEach(value => {
    if (keyNames.indexOf(value) === -1) {
      objectReduced[value] = originalObject[value];
    } else {
      elementsRecuded[value] = originalObject[value];
    }
  });
  return { originalObject, objectReduced, elementsRecuded };
};
