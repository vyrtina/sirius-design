import { createRequire } from "module";
const require = createRequire(import.meta.url);

const gulp = require("gulp"),
    replace = require("gulp-replace"),
    rename = require("gulp-rename"),
    svgmin = require("gulp-svgmin"),
    wrap = require("gulp-wrap"),
    fs = require("fs");

import data from "gulp-data";
import path from "path";

const svg_outlined_folder =
        path.dirname(require.resolve("@material-design-icons/svg/package.json")) +
        "/outlined",
    svg_filled_folder =
        path.dirname(require.resolve("@material-design-icons/svg/package.json")) +
        "/filled",
    dest_folder = "./",
    component_template = "./template.txt";

let icons_component_list = [];

gulp.task("icons_outlined_components", function () {
    console.log(svg_outlined_folder);
    return gulp
        .src([svg_outlined_folder + "/*.svg"])
        .pipe(
            svgmin({
                multipass: true,
                full: true,

                // https://github.com/svg/svgo/tree/master/plugins
                // https://github.com/svg/svgo#built-in-plugins
                plugins: [
                    { name: "cleanupIDs", params: { remove: true, minify: true } },
                    "removeDoctype",
                    "removeComments",
                    "removeTitle",
                    "removeDimensions",
                    "collapseGroups",
                    { name: "cleanupNumericValues", params: { floatPrecision: 4 } },
                    {
                        name: "convertColors",
                        params: { names2hex: true, rgb2hex: true },
                    },
                    "removeStyleElement",
                    "removeEmptyContainers",
                    {
                        name: "removeAttrs",
                        params: {
                            attrs: [
                                "(filter|fill|stroke|fill-rule|stroke-linecap|stroke-linejoin|stroke-width|transform|style|class|data.*)",
                                "svg:(width|height)",
                            ],
                        },
                    },
                    "removeUselessDefs",
                ],
            })
        )
        .pipe(replace(/<\/?svg(.*?)>/g, ""))
        .pipe(
            data(function (file) {
                const icon_name = path.parse(file.basename).name;
                const component_name = "sd-icon-" + icon_name.replace("_", "-");
                const icon_class =
                    "Icon" +
                    icon_name[0].toUpperCase() +
                    icon_name
                        .slice(1)
                        //snake_case to camelCase
                        .replace(/([-_][a-z])/g, (group) =>
                            group.toUpperCase().replace("-", "").replace("_", "")
                        );
                return {
                    component_name: component_name,
                    icon_class: icon_class,
                    sizes: "${sizes.get(this.size)}",
                };
            })
        )
        .pipe(wrap({ src: component_template }))
        .pipe(
            rename(function (path) {
                icons_component_list.push(path.basename);
                path.extname = ".ts";
            })
        )
        .pipe(gulp.dest(dest_folder + "/src"));
});

gulp.task("icons_filled_components", function () {
    console.log(svg_filled_folder);
    return gulp
        .src([svg_filled_folder + "/*.svg"])
        .pipe(
            svgmin({
                multipass: true,
                full: true,

                // https://github.com/svg/svgo/tree/master/plugins
                // https://github.com/svg/svgo#built-in-plugins
                plugins: [
                    { name: "cleanupIDs", params: { remove: true, minify: true } },
                    "removeDoctype",
                    "removeComments",
                    "removeTitle",
                    "removeDimensions",
                    "collapseGroups",
                    { name: "cleanupNumericValues", params: { floatPrecision: 4 } },
                    {
                        name: "convertColors",
                        params: { names2hex: true, rgb2hex: true },
                    },
                    "removeStyleElement",
                    "removeEmptyContainers",
                    {
                        name: "removeAttrs",
                        params: {
                            attrs: [
                                "(filter|fill|stroke|fill-rule|stroke-linecap|stroke-linejoin|stroke-width|transform|style|class|data.*)",
                                "svg:(width|height)",
                            ],
                        },
                    },
                    "removeUselessDefs",
                ],
            })
        )
        .pipe(replace(/<\/?svg(.*?)>/g, ""))
        .pipe(
            data(function (file) {
                const icon_name = path.parse(file.basename).name;
                const component_name =
                    "sd-icon-" + icon_name.replace("_", "-") + "-filled";
                const icon_class =
                    "Icon" +
                    icon_name[0].toUpperCase() +
                    icon_name
                        .slice(1)
                        //snake_case to camelCase
                        .replace(/([-_][a-z])/g, (group) =>
                            group.toUpperCase().replace("-", "").replace("_", "")
                        ) +
                    "Filled";
                return {
                    component_name: component_name,
                    icon_class: icon_class,
                    sizes: "${sizes.get(this.size)}",
                };
            })
        )
        .pipe(wrap({ src: component_template }))
        .pipe(
            rename(function (path) {
                path.basename += "-filled";
                icons_component_list.push(path.basename);
                path.extname = ".ts";
            })
        )
        .pipe(gulp.dest(dest_folder + "/src"));
});

gulp.task("icons_component_main", function (cb) {
    return fs.writeFile(
        dest_folder + "/index.ts",
        "/* GENERATED FILE. DO NOT EDIT DIRECTLY */\n\n" +
            icons_component_list
                .map((item) => {
                    let module_name = (
                        item.charAt(0).toUpperCase() + item.substr(1)
                    ).replace(/[_-]([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });

                    return `export { Icon${module_name} } from './src/${item}';`;
                })
                .join("\n"),
        cb
    );
});

gulp.task(
    "default",
    gulp.series(
        "icons_outlined_components",
        //"icons_filled_components",
        "icons_component_main"
    )
);
