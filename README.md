# Argumentje

Argumentje is a Node.js Module designed to simplify the process of parsing command line interface (CLI) arguments and transforming them into a valid object. With argumentje, handling command line arguments becomes straightforward and efficient.

## Setup

You can install argumentje via `npm`:

```shell
$ npm install argumentje
```

## Usage
Here's a simple example to demonstrate how to use Argumentje:

```javascript

// $ node ./index.js --minify --path=foo --debug=false

import { parse} from '@toolbarthomas/argumentje'

const args = parse()

// Output: { debug: false, minify: true, path: "foo" }

```

## API

### `argumentje(args)`
args: An array of CLI arguments, typically process.argv.

## License
argumentje is licensed under the MIT License. See the LICENSE file for more details.
