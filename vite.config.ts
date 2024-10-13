/// <reference types="vitest" />

import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import externalizeSourceDependencies from "@blockquote/rollup-plugin-externalize-source-dependencies";
import VitePluginCustomElementsManifest from "vite-plugin-cem";

export default defineConfig({
    plugins: [
        libInjectCss(),
        dts({}),
        VitePluginCustomElementsManifest(),
        externalizeSourceDependencies([
            /* @web/test-runner-commands needs to establish a web-socket
             * connection. It expects a file to be served from the
             * @web/dev-server. So it should be ignored by Vite */
            "/__web-dev-server__web-socket.js",
        ]),
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
            disableGlobbing: false,
        },
        fs: {
            cachedChecks: false,
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
        target: "es2015",
        lib: {
            entry: resolve("./src/main.ts"),
            formats: ["es"],
        },
        minify: false,
        rollupOptions: {
            input: Object.fromEntries(
                glob
                    .sync("src/**/*.ts", { ignore: "src/**/*.stories.ts" })
                    .map((file) => [
                        // The name of the entry point
                        // lib/nested/foo.ts becomes nested/foo
                        relative(
                            "src",
                            file.slice(0, file.length - extname(file).length)
                        ),
                        // The absolute path to the entry file
                        // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                        fileURLToPath(new URL(file, import.meta.url)),
                    ])
            ),
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "[name].js",
                chunkFileNames: undefined,
            },
            external: ["./sb-preview/runtime.js", /^lit/],
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
