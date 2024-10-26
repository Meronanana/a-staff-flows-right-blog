export function getDegreeFromCoordinate(x: number, y: number): number {
  return Math.atan2(y, x) * (180 / Math.PI);
}
