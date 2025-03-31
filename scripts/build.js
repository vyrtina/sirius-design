import {promises as fs} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

// Get __dirname equivalent in ES modules, accounting for scripts/ folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // scripts/
const rootDir = join(__dirname, '..'); // Project root

async function build() {
    // Process each .js file in dist
    const distDir = join(rootDir, 'dist');
    const files = await fs.readdir(distDir, {recursive: true}); // Get relative paths

    for (const file of files) {
        if (file.endsWith('.js')) {
            const filePath = join(distDir, file); // Use full relative path
            let content = await fs.readFile(filePath, 'utf8');

            // Find SCSS imports (e.g., import styles from './my-component.scss?inline')
            const importRegex = /import\s+styles\s+from\s+['"]\.\/([^'"]+)\.scss\?inline['"];/g;
            let match;
            while ((match = importRegex.exec(content)) !== null) {
                const cssFile = match[1] + '.css';

                // Replace import with CSS string
                content = content.replace(match[0], `import styles from "./${cssFile}";`);
            }

            await fs.writeFile(filePath, content, 'utf8');
        }
    }

    // Copy SCSS files to dist for customization (relative to root)
    //await fs.cp(join(rootDir, 'src', 'styles'), join(rootDir, 'dist', 'styles'), {recursive: true});
}

// Run the build and handle errors
try {
    await build();
} catch (error) {
    console.error('Build failed:', error);
}