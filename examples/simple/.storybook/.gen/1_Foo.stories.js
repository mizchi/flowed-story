/* @flow */
import React from 'react'
import { storiesOf } from '@storybook/react'
const ctx = storiesOf('Generated by flow', module)
import C from '../../src/components/Foo.js'
ctx.add('../../src/components/Foo.js', () => <C {...{"x":"<string: props.x>"}}/>)
