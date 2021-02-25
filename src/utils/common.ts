export type UpdateObj<T extends {}> = (data: T, update: Partial<T>) => T;

export const updateObj = <T extends {}>(data: T, update: Partial<T>): T => ({
  ...data,
  ...update,
});

export const filterByTitle = <T extends { title: string }>(
  search: string,
  array: Array<T>
): Array<T> => {
  if (search) {
    return array.filter((el) => el.title.toLocaleLowerCase().includes(search));
  }
  return array;
};
