import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/icons/",
  plugins: [react()],
  // Bind IPv4 explicitly: "localhost" can resolve to ::1 only, which breaks 127.0.0.1.
  server: { host: "127.0.0.1" },
  build: { outDir: "site-dist", emptyOutDir: true },
});
