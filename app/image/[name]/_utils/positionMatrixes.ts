export const translationMatrix = (tx: number, ty: number, tz: number) => [
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  tx,
  ty,
  tz,
  1,
];

export const scaleMatrix = (sx: number, sy: number, sz: number) => [
  sx,
  0,
  0,
  0,
  0,
  sy,
  0,
  0,
  0,
  0,
  sz,
  1,
  0,
  0,
  0,
  1,
];