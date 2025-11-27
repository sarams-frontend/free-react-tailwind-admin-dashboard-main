import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@/pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@/hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@/store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@/context": fileURLToPath(new URL("./src/context", import.meta.url)),
      "@/icons": fileURLToPath(new URL("./src/icons", import.meta.url)),
      "@/layout": fileURLToPath(new URL("./src/layout", import.meta.url)),
      "@/utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@/services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@/features": fileURLToPath(new URL("./src/features", import.meta.url)),
    },
  },
});
