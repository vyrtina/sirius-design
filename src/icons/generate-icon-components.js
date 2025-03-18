import { optimize } from "svgo";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { join, parse } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Configuration
const svgOutlinedFolder = join(
  parse(require.resolve("@material-design-icons/svg/package.json")).dir,
  "outlined",
);
const destFolder = "./src";
const templateFile = "./template.txt";

// SVGO configuration
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: "cleanupIds",
      params: {
        remove: true,
        minify: true,
      },
    },
    "removeDoctype",
    "removeComments",
    "removeTitle",
    "removeDimensions",
    "collapseGroups",
    {
      name: "cleanupNumericValues",
      params: { floatPrecision: 4 },
    },
    {
      name: "convertColors",
      params: {
        names2hex: true,
        rgb2hex: true,
      },
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
};

async function processIcons() {
  try {
    // Ensure output directory exists
    await mkdir(destFolder, { recursive: true });

    // Read template
    const template = await readFile(templateFile, "utf8");

    // Get all SVG files
    const files = await readdir(svgOutlinedFolder);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));
    const componentList = [];

    // Process each SVG file
    for (const file of svgFiles) {
      const svgContent = await readFile(join(svgOutlinedFolder, file), "utf8");

      // Optimize SVG with SVGO
      const optimized = optimize(svgContent, svgoConfig);

      // Remove SVG tags since they're added in the template
      const svgBody = optimized.data.replace(/<\/?svg(.*?)>/g, "");

      // Generate component names
      const iconName = parse(file).name;
      const componentName = `sd-icon-${iconName.replaceAll("_", "-")}`;
      const iconClass =
        "Icon" +
        iconName
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");

      // Create component content from template
      const componentContent = template
        .replace(/<%= contents %>/g, svgBody)
        .replace(/<%= component_name %>/g, componentName)
        .replace(/<%= icon_class %>/g, iconClass);

      // Write component file
      const outputFile = join(destFolder, `${componentName}.ts`);
      await writeFile(outputFile, componentContent);
      componentList.push(componentName);
    }

    // Generate index file
    const indexContent = [
      "/* GENERATED FILE. DO NOT EDIT DIRECTLY */",
      "",
      ...componentList.map((item) => {
        const moduleName = item
          .replace(/^sd-icon-/, "")
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
        return `export { Icon${moduleName} } from './src/${item}';`;
      }),
    ].join("\n");

    await writeFile("./index.ts", indexContent);

    console.log(`Processed ${componentList.length} icons successfully`);
  } catch (error) {
    console.error("Error processing icons:", error);
  }
}

// Run the processing
processIcons();
