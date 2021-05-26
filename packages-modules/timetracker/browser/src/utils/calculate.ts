export const calculateCost = (payRate: number, hours: number) => {
  const cost = payRate * hours;
  return cost;
};

export const calculateProfit = (payRate: number, billRate: number, hours: number) => {
  const profit = billRate * hours - payRate * hours;
  return profit;
};
