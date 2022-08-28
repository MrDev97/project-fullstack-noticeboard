export const dateToString = (d) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  const dateWZero = ('0' + date.toString()).slice(-2);
  const monthWZero = ('0' + month.toString()).slice(-2);

  return `${dateWZero}-${monthWZero}-${year}`;
};
