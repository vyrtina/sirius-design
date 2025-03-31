/// <reference types="vitest" />

import {resolve} from "path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import {libInjectCss} from "vite-plugin-lib-inject-css";

export default defineConfig({
    assetsInclude: ["/sb-preview/runtime.js"],
    plugins: [
        libInjectCss(),
        dts({}),
    ],
    server: {
        host: "localhost",
        port: 5169,
        open: false,
        watch: {
            usePolling: true,
            disableGlobbing: false,
        },
    },
    build: {
        assetsDir: resolve("./src/assets/"),
        copyPublicDir: false,
        manifest: true,
        emptyOutDir: true,
        target: "es2021",
        lib: {
            entry: "src/main.ts",
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
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
});
