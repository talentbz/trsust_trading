
const numberFormat = (num, fDigit=0) => {

  const formattedNumber = num.toLocaleString('en-US', {
    minimumFractionDigits: fDigit,
    maximumFractionDigits: fDigit,
  });

  return formattedNumber;
};

export const common = { numberFormat };