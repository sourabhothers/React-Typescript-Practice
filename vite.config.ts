import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import Inspect from "vite-plugin-inspect";
import purgeCSS from "rollup-plugin-purgecss";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@public": resolve(__dirname, "public"),
      "@src": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
    },
  },
  plugins: [
    Inspect(),
    react(),
    purgeCSS({ content: ["**/*"] }),
    VitePWA({
      workbox: {
        sourcemap: true,
      },
      manifest: {
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "To-Do App",
        short_name: "ToDo Short NAme",
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
