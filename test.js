import { createRequire } from "module";

import mArgumentje from "./dist/index.mjs";
import cArgumentje from "./dist/index.cjs";
import argumentje from "./dist/index.js";
const required = createRequire(import.meta.url)("./dist/index.cjs");

if (
  !mArgumentje.parse ||
  !cArgumentje.parse ||
  !argumentje.parse ||
  !required.parse
) {
  throw Error(`Invalid import detected.`);
}

const test = (fn) => {
  const args = fn() || {};

  if (args.boolean !== true) {
    throw Error(`Unable to parse boolean`);
  }

  if (args.e !== true) {
    throw Error(`Unable to parse flag`);
  }

  if (typeof args.number !== "number") {
    throw Error(`Unable to parse number`);
  }

  if (typeof args.number !== "number") {
    throw Error(`Unable to parse number`);
  }

  if (args.not !== false) {
    throw Error(`Unable to parse number`);
  }

  if (args.null !== null) {
    throw Error(`Unable to parse null`);
  }

  if (args.un === undefined) {
    throw Error(`Unexpected transform detected`);
  }
};

test(argumentje.parse);
test(cArgumentje.parse);
test(mArgumentje.parse);
test(required.parse);
