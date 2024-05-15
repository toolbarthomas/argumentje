import path, { extname, format } from "node:path";

import esbuild from "esbuild";

/**
 * Compiles the mandatory Testing Suite that should not fail during production.
 */
(async () => {
  const defaults = {
    bundle: true,
    entryPoints: ["./src/index.ts"],
    external: [],
    keepNames: true,
    platform: "node",
    metafile: false,
    minify: false,
    outdir: "dist",
    minify: true,
  };

  await esbuild.build({ ...defaults, format: "esm" });

  await esbuild.build({
    ...defaults,
    format: "esm",
    outExtension: { ".js": ".mjs" },
  });

  await esbuild.build({
    ...defaults,
    format: "cjs",
    outExtension: { ".js": ".cjs" },
  });

  console.info(`Package compiled.`);
})();
