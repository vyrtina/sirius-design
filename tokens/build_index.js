import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonConcat = require("json-concat");

const directoryPath = "C:\\Users\\Elyes\\Documents\\sirius-design\\tokens\\colors";

// Read the filenames in the directory
const files = fs.readdirSync(directoryPath);

// Pass the filenames to json-concat
jsonConcat(
    {
        src: files.map((file) => path.join(directoryPath, file)),
        dest: "./tokens/tokens.json", // Output file path
    },
    function (json) {
        console.log("Merged JSON:", json);
    }
);
