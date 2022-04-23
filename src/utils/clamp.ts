interface Boundary {
  min: number
  max: number
}

export const clamp = (num: number, { min, max }: Boundary) => {
  "worklet"
  return Math.min(Math.max(num, min), max)
}
