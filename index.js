/* @flow */

type Point = {
  x: number,
  y: number
}

type Optional<T> = T | null

type Props = {
  a: string,
  p: Point,
  c: {
    d: { e: any }
  },
  arr: Array<number>,
  opt: Optional<string>
}

const props: Props = {
  a: 'foo',
  p: { x: 1, y: 2 },
  c: { d: { e: 3 } },
  arr: [1],
  opt: ''
}

export default props
export const v = 1
