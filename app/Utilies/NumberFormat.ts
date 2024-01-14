export function number2unit(n: number, fixed: number = 2): string {
  let unitNumber = n.toString();

  if (n > 1.0e9) {
    unitNumber = (n / 1.0e9).toFixed(fixed) + 'B';
  } else if (n > 1.0e6) {
    unitNumber = (n / 1.0e6).toFixed(fixed) + 'M';
  } else if (n > 1.0e3) {
    unitNumber = (n / 1.0e3).toFixed(fixed) + 'K';
  }

  return unitNumber;
}
