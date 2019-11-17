export function isNumeric(str: string): boolean {
  return !isNaN(parseFloat(str)) && isFinite(+str);
}
