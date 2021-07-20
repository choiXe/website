export const numSeperator = (num) => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return num;
  }
};
