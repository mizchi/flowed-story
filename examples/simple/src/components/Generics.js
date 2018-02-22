/* @flow */
import React from 'react'
type X<T> = { x: T }
export default (props: X<number>) => <div>{props.x}</div>
