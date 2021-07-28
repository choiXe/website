export const numSeperator = (num) => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return num;
  }
};

export const calColor = (x, y) => {
  if (isNaN(x)) return { color: '#000000' };
  if (x > y) {
    return { color: '#e21414' };
  } else if (x < y) {
    return { color: '#246ded' };
  }
  return { color: '#000000' };
};

export const slicer = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else {
    return str;
  }
};

export const strToNum = (number) => {
  return parseFloat(number.replace(/[,배원]/g, ''));
};
