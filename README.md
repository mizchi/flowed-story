# flowed-story

(Very early stage)

Generate stories by your react components and flowtype annotation

## How to use

Write your components with flow.

```js
/* @flow */
import React from 'react'
export default (props: { x: string }) => <div>Foo: {props.x}</div>
```

Use cli command to generate story.

```sh
$ npm install -g flowed-story
$ mkdirp -p .storybook/.gen
$ flowed-story 'src/components/**/*.js'
gen > <project-root>/.storybook/.gen/0_Foo.stories.js
```

Load these storise from your storybook.

```js
// .storybook/config.js
import { configure } from '@storybook/react'

const req = require.context('./.gen', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
```

Run it

```sh
$ npm run storybook
```

![](https://i.gyazo.com/0231b742016be760f7c43a91906f8c5e.png)

See `examples/simple`

## TODO

* Optional
* Generics
* Mock by reflection
* Wrap with props editor
* Use `export type __flowed_story_types = {...}` alternative
* Use `export const __flowed_story_props = {...}` alternative

## LICENSE

MIT
