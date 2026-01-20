# Argumentje

Argumentje is a lightweight  alternative for parsing [command line arguments](https://nodejs.org/api/process.html#processargv)

## Getting started

You can install this package via NPM, we assume [Node.js](https://nodejs.org) is installed.

```bash
$ npm install @toolbarthomas/argumentje
```

## Setup

```js
  // $ node ./index.js --minify --path=foo --debug=false

  import { parse } from '@toolbarthomas/argumentje'

  const args = parse()

  // Output: { debug: false, minify: true, path: "foo" }
```