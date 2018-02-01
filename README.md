# Flow

## Goal

* Generate storybook's story to react component with flowtype

## Result

```
$ yarn babel-node run.js
yarn run v1.2.1
$ /Users/mz/sandbox/flowstory/node_modules/.bin/babel-node run.js
{
  "a": "<string>",
  "arr": [
    42
  ],
  "c": {
    "d": {
      "e": "<any>"
    }
  },
  "opt": {},
  "p": {
    "x": 42,
    "y": 42
  }
}
Done in 0.69s.
```

## LICENSE

MIT
