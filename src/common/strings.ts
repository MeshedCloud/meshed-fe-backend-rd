export const StringArrToIntArr = (arr: string[]): number[] => {
  const nums: number[] = [];
  if (arr === undefined || arr.length === 0) {
    return nums;
  }
  arr.forEach(value => nums.push(Number(value)))
  return nums;
};
