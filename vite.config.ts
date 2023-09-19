import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: [
        "react",
        "react-router-dom",
        {
          "ar-catch": ["config", "$catch", "useCache"],
        },
      ],
    }),
  ],
});
