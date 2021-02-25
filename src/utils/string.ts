export const isEmpty = (str: string | null | undefined) => {
  if (!str) return true;
  if (str.trim().length === 0) return true;
  return false;
};
