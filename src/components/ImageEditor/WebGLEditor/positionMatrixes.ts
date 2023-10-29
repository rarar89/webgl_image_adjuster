export function translationMatrix(tx:number, ty:number, tz:number) {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1
  ];
}

export function scaleMatrix(sx:number, sy:number, sz:number) {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 1,
    0, 0, 0, 1
  ];
}