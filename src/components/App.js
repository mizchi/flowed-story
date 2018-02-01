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

const App = (props: Props) => <div>Generated: {props.a}</div>

export default App
