// vite.config.ts
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "file:///C:/Users/Elyes/Documents/sirius-design/node_modules/glob/dist/esm/index.js";
import { defineConfig } from "file:///C:/Users/Elyes/Documents/sirius-design/node_modules/vite/dist/node/index.js";
import dts from "file:///C:/Users/Elyes/Documents/sirius-design/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///C:/Users/Elyes/Documents/sirius-design/node_modules/vite-plugin-lib-inject-css/dist/index.mjs";
import externalizeSourceDependencies from "file:///C:/Users/Elyes/Documents/sirius-design/node_modules/@blockquote/rollup-plugin-externalize-source-dependencies/dist/rollup-plugin-externalize-source-dependencies.js";
import VitePluginCustomElementsManifest from "file:///C:/Users/Elyes/Documents/sirius-design/node_modules/vite-plugin-cem/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Elyes/Documents/sirius-design/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    libInjectCss(),
    dts({}),
    VitePluginCustomElementsManifest(),
    externalizeSourceDependencies([
      /* @web/test-runner-commands needs to establish a web-socket
       * connection. It expects a file to be served from the
       * @web/dev-server. So it should be ignored by Vite */
      "/__web-dev-server__web-socket.js"
    ])
  ],
  assetsInclude: ["/sb-preview/runtime.js"],
  //root: resolve('./static/'),
  //base: '/static/',
  server: {
    host: "localhost",
    port: 5169,
    open: false,
    watch: {
      usePolling: true,
      disableGlobbing: false
    },
    fs: {
      cachedChecks: false
    }
  },
  resolve: {
    extensions: [".ts", ".js", ".css", ".scss", ".mdx", ".json"]
  },
  build: {
    assetsDir: resolve("./src/assets/"),
    copyPublicDir: false,
    manifest: true,
    emptyOutDir: true,
    target: "es2015",
    lib: {
      entry: resolve("./src/main.ts"),
      formats: ["es"]
    },
    minify: false,
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync("src/**/*.ts", { ignore: "src/**/*.stories.ts" }).map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative(
            "src",
            file.slice(0, file.length - extname(file).length)
          ),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        chunkFileNames: void 0
      },
      external: ["./sb-preview/runtime.js", /^lit/]
    }
  },
  test: {
    // Lit recommends using browser environment for testing
    // https://lit.dev/docs/tools/testing/#testing-in-the-browser
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFbHllc1xcXFxEb2N1bWVudHNcXFxcc2lyaXVzLWRlc2lnblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRWx5ZXNcXFxcRG9jdW1lbnRzXFxcXHNpcml1cy1kZXNpZ25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0VseWVzL0RvY3VtZW50cy9zaXJpdXMtZGVzaWduL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgZXh0bmFtZSwgcmVsYXRpdmUsIHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbmltcG9ydCB7IGdsb2IgfSBmcm9tIFwiZ2xvYlwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSBcInZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzXCI7XHJcbmltcG9ydCBleHRlcm5hbGl6ZVNvdXJjZURlcGVuZGVuY2llcyBmcm9tIFwiQGJsb2NrcXVvdGUvcm9sbHVwLXBsdWdpbi1leHRlcm5hbGl6ZS1zb3VyY2UtZGVwZW5kZW5jaWVzXCI7XHJcbmltcG9ydCBWaXRlUGx1Z2luQ3VzdG9tRWxlbWVudHNNYW5pZmVzdCBmcm9tIFwidml0ZS1wbHVnaW4tY2VtXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIGxpYkluamVjdENzcygpLFxyXG4gICAgICAgIGR0cyh7fSksXHJcbiAgICAgICAgVml0ZVBsdWdpbkN1c3RvbUVsZW1lbnRzTWFuaWZlc3QoKSxcclxuICAgICAgICBleHRlcm5hbGl6ZVNvdXJjZURlcGVuZGVuY2llcyhbXHJcbiAgICAgICAgICAgIC8qIEB3ZWIvdGVzdC1ydW5uZXItY29tbWFuZHMgbmVlZHMgdG8gZXN0YWJsaXNoIGEgd2ViLXNvY2tldFxyXG4gICAgICAgICAgICAgKiBjb25uZWN0aW9uLiBJdCBleHBlY3RzIGEgZmlsZSB0byBiZSBzZXJ2ZWQgZnJvbSB0aGVcclxuICAgICAgICAgICAgICogQHdlYi9kZXYtc2VydmVyLiBTbyBpdCBzaG91bGQgYmUgaWdub3JlZCBieSBWaXRlICovXHJcbiAgICAgICAgICAgIFwiL19fd2ViLWRldi1zZXJ2ZXJfX3dlYi1zb2NrZXQuanNcIixcclxuICAgICAgICBdKSxcclxuICAgIF0sXHJcbiAgICBhc3NldHNJbmNsdWRlOiBbXCIvc2ItcHJldmlldy9ydW50aW1lLmpzXCJdLFxyXG4gICAgLy9yb290OiByZXNvbHZlKCcuL3N0YXRpYy8nKSxcclxuICAgIC8vYmFzZTogJy9zdGF0aWMvJyxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXHJcbiAgICAgICAgcG9ydDogNTE2OSxcclxuICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlR2xvYmJpbmc6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnM6IHtcclxuICAgICAgICAgICAgY2FjaGVkQ2hlY2tzOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBleHRlbnNpb25zOiBbXCIudHNcIiwgXCIuanNcIiwgXCIuY3NzXCIsIFwiLnNjc3NcIiwgXCIubWR4XCIsIFwiLmpzb25cIl0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBhc3NldHNEaXI6IHJlc29sdmUoXCIuL3NyYy9hc3NldHMvXCIpLFxyXG4gICAgICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxyXG4gICAgICAgIG1hbmlmZXN0OiB0cnVlLFxyXG4gICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICAgIHRhcmdldDogXCJlczIwMTVcIixcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoXCIuL3NyYy9tYWluLnRzXCIpLFxyXG4gICAgICAgICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBpbnB1dDogT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICAgICAgICAgICAgZ2xvYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zeW5jKFwic3JjLyoqLyoudHNcIiwgeyBpZ25vcmU6IFwic3JjLyoqLyouc3Rvcmllcy50c1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoZmlsZSkgPT4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZW50cnkgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGliL25lc3RlZC9mb28udHMgYmVjb21lcyBuZXN0ZWQvZm9vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuc2xpY2UoMCwgZmlsZS5sZW5ndGggLSBleHRuYW1lKGZpbGUpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIGVudHJ5IGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGliL25lc3RlZC9mb28udHMgYmVjb21lcyAvcHJvamVjdC9saWIvbmVzdGVkL2Zvby50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoZmlsZSwgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdW2V4dG5hbWVdXCIsXHJcbiAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0uanNcIixcclxuICAgICAgICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbXCIuL3NiLXByZXZpZXcvcnVudGltZS5qc1wiLCAvXmxpdC9dLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdGVzdDoge1xyXG4gICAgICAgIC8vIExpdCByZWNvbW1lbmRzIHVzaW5nIGJyb3dzZXIgZW52aXJvbm1lbnQgZm9yIHRlc3RpbmdcclxuICAgICAgICAvLyBodHRwczovL2xpdC5kZXYvZG9jcy90b29scy90ZXN0aW5nLyN0ZXN0aW5nLWluLXRoZS1icm93c2VyXHJcbiAgICAgICAgYnJvd3Nlcjoge1xyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiBcImNocm9taXVtXCIsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyOiBcInBsYXl3cmlnaHRcIixcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgICAgICAgYXBpOiBcIm1vZGVybi1jb21waWxlclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsU0FBUyxVQUFVLGVBQWU7QUFDM0MsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxZQUFZO0FBQ3JCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1DQUFtQztBQUMxQyxPQUFPLHNDQUFzQztBQVRnSixJQUFNLDJDQUEyQztBQVc5TyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixJQUFJLENBQUMsQ0FBQztBQUFBLElBQ04saUNBQWlDO0FBQUEsSUFDakMsOEJBQThCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJMUI7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxlQUFlLENBQUMsd0JBQXdCO0FBQUE7QUFBQTtBQUFBLEVBR3hDLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNILFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLElBQ3JCO0FBQUEsSUFDQSxJQUFJO0FBQUEsTUFDQSxjQUFjO0FBQUEsSUFDbEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxZQUFZLENBQUMsT0FBTyxPQUFPLFFBQVEsU0FBUyxRQUFRLE9BQU87QUFBQSxFQUMvRDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsV0FBVyxRQUFRLGVBQWU7QUFBQSxJQUNsQyxlQUFlO0FBQUEsSUFDZixVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDRCxPQUFPLFFBQVEsZUFBZTtBQUFBLE1BQzlCLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDbEI7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNYLE9BQU8sT0FBTztBQUFBLFFBQ1YsS0FDSyxLQUFLLGVBQWUsRUFBRSxRQUFRLHNCQUFzQixDQUFDLEVBQ3JELElBQUksQ0FBQyxTQUFTO0FBQUE7QUFBQTtBQUFBLFVBR1g7QUFBQSxZQUNJO0FBQUEsWUFDQSxLQUFLLE1BQU0sR0FBRyxLQUFLLFNBQVMsUUFBUSxJQUFJLEVBQUUsTUFBTTtBQUFBLFVBQ3BEO0FBQUE7QUFBQTtBQUFBLFVBR0EsY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDaEQsQ0FBQztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQSxVQUFVLENBQUMsMkJBQTJCLE1BQU07QUFBQSxJQUNoRDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE1BQU07QUFBQTtBQUFBO0FBQUEsSUFHRixTQUFTO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDZDtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLEtBQUs7QUFBQSxNQUNUO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
