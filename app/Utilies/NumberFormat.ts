export function number2unit(n: number, fixed: number): string {
  let unitNumber = n.toString();

  if (n > 1.0e9) {
    unitNumber = (n / 1.0e9).toFixed(2) + 'B';
  } else if (n > 1.0e6) {
    unitNumber = (n / 1.0e6).toFixed(2) + 'M';
  } else if (n > 1.0e3) {
    unitNumber = (n / 1.0e3).toFixed(2) + 'K';
  }

  return unitNumber;
}
