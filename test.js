import { createRequire } from 'module'

import mArgumentje from './dist/index.mjs'
import cArgumentje from './dist/index.cjs'
import argumentje from './dist/index.js'
const required = createRequire(import.meta.url)('./dist/index.cjs')

if (!mArgumentje.parse || !cArgumentje.parse || !argumentje.parse || !required.parse) {
  throw Error(`Invalid import detected.`)
}

const test = (fn) => {
  const args = fn() || {}

  if (args.boolean !== true) {
    throw Error(`Unable to parse boolean`)
  }

  if (args.e !== true) {
    throw Error(`Unable to parse flag`)
  }

  if (typeof args.number !== 'number') {
    throw Error(`Unable to parse number`)
  }

  if (typeof args.number !== 'number') {
    throw Error(`Unable to parse number`)
  }

  if (args.not !== false) {
    throw Error(`Unable to parse number`)
  }

  if (args.null !== null) {
    throw Error(`Unable to parse null`)
  }

  if (args.un === undefined) {
    throw Error(`Unexpected transform detected`)
  }

  const staticArgs = fn(['foo.js', 'bar'])

  if (staticArgs.bar !== 'bar') {
    throw Error(`Unable to parse static argument: bar`)
  }

  if (staticArgs['foo.js'] !== 'foo.js') {
    throw Error(`Unable to parse static argument: foo.js`)
  }

  const exception = fn(1)

  if (Object.keys(exception).length) {
    throw Error(`Unexpected result detected for enforced exception...`)
  }
}

const testPositionals = (fn) => {
  const boolTrue = fn(['true'])
  if (boolTrue['true'] !== true)
    throw Error(`Positional 'true' should coerce to boolean true`)

  const boolFalse = fn(['false'])
  if (boolFalse['false'] !== false)
    throw Error(`Positional 'false' should coerce to boolean false`)

  const num = fn(['0.5'])
  if (num['0.5'] !== 0.5)
    throw Error(`Positional '0.5' should coerce to number 0.5`)

  const nul = fn(['null'])
  if (nul['null'] !== null)
    throw Error(`Positional 'null' should coerce to null`)

  const strs = fn(['foo.js', 'bar'])
  if (strs['bar'] !== 'bar' || strs['foo.js'] !== 'foo.js')
    throw Error(`Plain positional strings should remain strings`)
}

test(argumentje.parse)
test(cArgumentje.parse)
test(mArgumentje.parse)
test(required.parse)

testPositionals(argumentje.parse)
testPositionals(cArgumentje.parse)
testPositionals(mArgumentje.parse)
testPositionals(required.parse)

console.log(`Test completed`)
