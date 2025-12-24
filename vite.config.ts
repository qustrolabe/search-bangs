import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      strategies: "injectManifest", // Enable custom SW
      srcDir: "src",                // Look in src folder
      filename: "sw.ts",            // For this file
      manifest: {
        theme_color: "#111",
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Allows testing SW in dev mode
        type: "module",
      }
    }),
  ],
});
