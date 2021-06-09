export const calculateCost = (payRate: number, hours: number) => {
  const cost = payRate * hours;
  return cost;
};

export const calculateProfit = (payRate: number, billRate: number, hours: number) => {
  const profit = billRate * hours - payRate * hours;
  return profit;
};

export const capitalize = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};
