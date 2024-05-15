export const parse = () => {
  const args = process.argv.slice(2).reverse();

  const result: { [key: string]: any } = {};

  for (let i = args.length; i--; ) {
    let [current, ...rest] = args[i]
      .replace("--", "")
      .split("=")
      .filter((e) => e);

    if (current === undefined) {
      continue;
    }

    let [v] = rest || [];

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

    result[current] = v === undefined ? true : v;
  }

  return result;
};

export default {
  parse,
};
