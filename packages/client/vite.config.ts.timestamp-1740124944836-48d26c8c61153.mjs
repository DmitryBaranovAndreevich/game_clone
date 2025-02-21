// ../client/vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/HP/Desktop/myProjects2/game_clone/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/HP/Desktop/myProjects2/game_clone/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/Users/HP/Desktop/myProjects2/game_clone/node_modules/dotenv/lib/main.js";
var __vite_injected_original_dirname = "C:\\Users\\HP\\Desktop\\myProjects2\\game_clone\\packages\\client";
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__vite_injected_original_dirname, "index.html"),
        "service-worker": resolve(__vite_injected_original_dirname, "src/workers/service-worker.ts")
      },
      output: [
        {
          entryFileNames: (opt) => {
            if (/^service-worker.*/.test(opt.name)) {
              return "assets/sw.js";
            }
            return `assets/[name]-[hash].js`;
          }
        }
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFxteVByb2plY3RzMlxcXFxnYW1lX2Nsb25lXFxcXHBhY2thZ2VzXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFxteVByb2plY3RzMlxcXFxnYW1lX2Nsb25lXFxcXHBhY2thZ2VzXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvSFAvRGVza3RvcC9teVByb2plY3RzMi9nYW1lX2Nsb25lL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcbmltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiXG5kb3RlbnYuY29uZmlnKClcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5DTElFTlRfUE9SVCkgfHwgMzAwMCxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgX19TRVJWRVJfUE9SVF9fOiBwcm9jZXNzLmVudi5TRVJWRVJfUE9SVCxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBcInNlcnZpY2Utd29ya2VyXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLnRzXCIpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDogW1xuICAgICAgICB7XG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IG9wdCA9PiB7XG4gICAgICAgICAgICBpZiAoL15zZXJ2aWNlLXdvcmtlci4qLy50ZXN0KG9wdC5uYW1lKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJhc3NldHMvc3cuanNcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvW25hbWVdLVtoYXNoXS5qc2BcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1gsU0FBUyxlQUFlO0FBQ3hZLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFIbkIsSUFBTSxtQ0FBbUM7QUFJekMsT0FBTyxPQUFPO0FBR2QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTSxPQUFPLFFBQVEsSUFBSSxXQUFXLEtBQUs7QUFBQSxFQUMzQztBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04saUJBQWlCLFFBQVEsSUFBSTtBQUFBLEVBQy9CO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxrQkFBa0IsUUFBUSxrQ0FBVywrQkFBK0I7QUFBQSxNQUN0RTtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ047QUFBQSxVQUNFLGdCQUFnQixTQUFPO0FBQ3JCLGdCQUFJLG9CQUFvQixLQUFLLElBQUksSUFBSSxHQUFHO0FBQ3RDLHFCQUFPO0FBQUEsWUFDVDtBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
