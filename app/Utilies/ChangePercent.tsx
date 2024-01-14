export function changedPercentage(open: number, current: number): number {
  return (current - open) / open;
}
