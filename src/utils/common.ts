export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export function squareSum(arr: number[]): number {
  return arr.reduce((acc, v) => acc + v * v, 0);
}
