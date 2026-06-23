import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        products: resolve(import.meta.dirname, "products.html"),
        dock: resolve(import.meta.dirname, "dock.html"),
        fpv: resolve(import.meta.dirname, "fpv.html"),
        cases: resolve(import.meta.dirname, "cases.html"),
        about: resolve(import.meta.dirname, "about.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
      },
    },
  },
});
