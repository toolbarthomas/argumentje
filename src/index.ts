export type V = boolean | number | string | undefined | null;
export type Response = { [key: string]: V };
export type Parser = (value?: string[]) => Response;

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
      let [current] = args[i].split("-").filter((e) => e);

      const arg = current && current.split("=");

      if (arg === undefined) {
        continue;
      }

      const [name, ...rest] = arg;

      if (name === undefined) {
        continue;
      }

      const [initial] = rest || [];
      let v: any = initial;

      if (!args[i].startsWith("-") && typeof current === "string") {
        v = current;
      } else if (v !== undefined) {
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

      response[name] = v === undefined ? true : v;
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
