import { resolve } from "path";
import { defineConfig } from "vite";
import VitePluginCustomElementsManifest from "vite-plugin-cem";

export default defineConfig({
    plugins: [VitePluginCustomElementsManifest()],
    assetsInclude: ["/sb-preview/runtime.js"],
    //root: resolve('./static/'),
    //base: '/static/',
    server: {
        host: "localhost",
        port: 5170,
        open: false,
        watch: {
            usePolling: true,
            disableGlobbing: false,
        },
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".css", ".scss"],
    },
    build: {
        outDir: resolve("./static/dist"),
        assetsDir: "",
        manifest: true,
        emptyOutDir: true,
        target: "es2015",
        //lib: {
        //  entry: resolve('static/src/ts/my-element.ts'),
        //  formats: ['es']
        //},
        minify: false,
        rollupOptions: {
            //input: {
            //  main: resolve('./static/src/ts/my-elements.ts'),
            //},
            output: {
                chunkFileNames: undefined,
            },
            external: ["./sb-preview/runtime.js", /^lit/],
        },
    },
});
