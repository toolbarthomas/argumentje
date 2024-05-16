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
    metafile: false,
    outdir: "dist",
    platform: "node",
  };

  Promise.all([
    esbuild.build({ ...defaults, format: "esm" }),
    esbuild.build({
      ...defaults,
      format: "esm",
      minify: true,
      outExtension: { ".js": ".min.js" },
    }),
    esbuild.build({
      ...defaults,
      format: "esm",
      outExtension: { ".js": ".mjs" },
    }),
    esbuild.build({
      ...defaults,
      format: "esm",
      minify: true,
      outExtension: { ".js": ".min.mjs" },
    }),
    esbuild.build({
      ...defaults,
      format: "cjs",
      outExtension: { ".js": ".cjs" },
    }),
    esbuild.build({
      ...defaults,
      format: "cjs",
      minify: true,
      outExtension: { ".js": ".min.cjs" },
    }),
  ]).then(() => {
    console.info(`Package compiled.`);
  });
})();
