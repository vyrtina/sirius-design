/// <reference types="vitest" />

import {resolve} from "path";
import {defineConfig} from "vite";

export default defineConfig({
    assetsInclude: ["/sb-preview/runtime.js"],
    server: {
        host: "localhost",
        port: 5169,
        open: false,
        watch: {
            usePolling: true,
            disableGlobbing: false,
        },
    },
    resolve: {
        extensions: [".ts", ".js", ".css", ".scss", ".mdx", ".json"],
    },
    build: {
        assetsDir: resolve("./src/assets/"),
        copyPublicDir: false,
        manifest: true,
        emptyOutDir: true,
        target: "es2021",
        lib: {
            entry: resolve("./src/main.ts"),
            name: 'SdComponents',
            fileName: 'main',
            formats: ["es"],
        },
        minify: false,
        rollupOptions: {

            external: ['lit', /^lit\/.*/],
            output: {
                preserveModules: true,
                exports: 'named'
            }
        },
    },
    test: {
        // Lit recommends using browser environment for testing
        // https://lit.dev/docs/tools/testing/#testing-in-the-browser
        browser: {
            enabled: true,
            name: "chromium",
            provider: "playwright",
        },
    },
    /*css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },*/
});
