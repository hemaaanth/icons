import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    core: "src/core/index.ts",
    react: "src/react/index.tsx",
    vue: "src/vue/index.ts",
    vanilla: "src/vanilla/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: ["react", "vue", "svelte"],
});
