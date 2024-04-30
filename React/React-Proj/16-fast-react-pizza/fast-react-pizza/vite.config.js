import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// import { createEsLintPlugin } from "vite-plugin-eslint"; // Import the ESLint plugin for Vite

// Create the ESLint plugin instance
// const eslintPlugin = createEsLintPlugin({ cache: false }); // don't save linting of files cuz we need to check on every save/change in dev environments.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // starter plugin shows the start page
    eslint(),
    // eslintPlugin, // makes eslint to check the code in realtime
  ],
});

// plugins are basically like extensions in browser
