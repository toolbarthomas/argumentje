import { Parser, Response } from "./types";

/**
 * Simple Command Line Interface parser for Node.js
 *
 * - Boolean
 * - Null
 * - Number
 * - Flag
 * - String
 */
export const parse: Parser = (value) => {
  //@ts-ignore
  const args = value || process.argv.slice(2).reverse();
  const response: Response = {};

  try {
    for (let i = args.length; i--; ) {
      let [current, ...rest] = args[i]
        .replace("--", "")
        .split("=")
        .filter((e) => e);

      if (current === undefined) {
        continue;
      }

      const [initial] = rest || [];
      let v: any = initial;

      if (v !== undefined) {
        if (v === "null") {
          v = null;
        } else if (String(v).toUpperCase() === "TRUE") {
          v = true;
        } else if (String(v).toUpperCase() === "FALSE") {
          v = false;
        } else if (parseInt(v)) {
          v = parseInt(v);
        }
      }

      while (current.startsWith("-")) {
        current = current.slice(1);
      }

      response[current] = v === undefined ? true : v;
    }
  } catch (exception) {
    if (exception) {
      return {};
    }
  }

  return response;
};

export default {
  parse,
};
