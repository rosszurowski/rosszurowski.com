export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function constrain(
  val: number,
  min: number,
  max: number = Number.POSITIVE_INFINITY
) {
  return Math.min(Math.max(val, min), max)
}

export function randomItem<T>(arr: T[]): T {
  return arr[randomNumber(0, arr.length - 1)]
}
