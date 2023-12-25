export function changedPercentage(open: number, current: number): number {
  return (open - current) / open;
}
