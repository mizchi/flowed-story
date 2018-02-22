# flowed-story

(Very early stage)

Generate stories by your react components and flowtype annotation

## How to use

```sh
$ npm install -g flowed-story
$ mkdirp -p .storybook/.gen
$ flowed-story 'src/components/**/*.js'
gen > <project-root>/.storybook/.gen/_tmp.js
gen > <project-root>/.storybook/.gen/0.stories.js
gen > <project-root>/.storybook/.gen/1.stories.js
gen > <project-root>/.storybook/.gen/2.stories.js
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

## LICENSE

MIT
