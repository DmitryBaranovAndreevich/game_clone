import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "service-worker": resolve(__dirname, "src/workers/service-worker.ts"),
      },
      output: [
        {
          entryFileNames: opt => {
            if (/^service-worker.*/.test(opt.name)) {
              return "sw.js"
            }
            return `assets/[name]-[hash].js`
          },
        },
      ],
    },
  },
})
