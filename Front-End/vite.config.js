import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ["../", "./node_modules/slick-carousel"], // Explicitly allow access to slick-carousel
    },
  },
  resolve: {
    alias: {
      // Create an alias for slick-carousel fonts
      "slick-carousel/slick/fonts": path.resolve(
        __dirname,
        "node_modules/slick-carousel/slick/fonts"
      ),
    },
  },
});
