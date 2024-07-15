import BetterLitTypesPlugin from "cem-plugin-better-lit-types";

export default {
    /** Globs to analyze */
    globs: ["src/components/**/*.ts"],
    /** Globs to exclude */
    exclude: ["src/**/*.stories.ts", "src/icons"],
    /** Directory to output CEM to */
    outdir: "./.storybook/",
    /** Run in dev mode, provides extra logging */
    dev: true,
    /** Run in watch mode, runs on file changes */
    watch: true,
    /** Include third party custom elements manifests */
    dependencies: true,
    /** Output CEM path to `package.json`, defaults to true */
    packagejson: false,
    /** Enable special handling for litelement */
    litelement: true,
    /** Enable special handling for catalyst */
    catalyst: false,
    /** Enable special handling for fast */
    fast: false,
    /** Enable special handling for stencil */
    stencil: false,
    /** Provide custom plugins */
    plugins: [BetterLitTypesPlugin],
};
