/* @flow */
import React from 'react'

type Point = {
  x: number,
  y: number
}

type Props = {
  a: string,
  p: Point,
  c: {
    d: { e: any }
  },
  arr: Array<number>
}

const props: Props = {
  a: 'foo',
  p: { x: 1, y: 2 },
  c: { d: { e: 3 } },
  arr: [1]
}

export default (props: Props) => (
  <div>
    <p>
      App: {props.a}
      <br />
      p: {props.p.x}/{props.p.y}
      <br />
      c: d: {props.c.d.e}
      <br />
      arr.length: {props.arr.length}
    </p>
  </div>
)
