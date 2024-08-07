import { setCustomElementsManifest } from "@storybook/web-components";
import manifest from "./custom-elements.json"; //"virtual:vite-plugin-cem/custom-elements-manifest"
import {
    createArgsExtractor,
    createLitRenderer,
} from "cem-plugin-better-lit-types/storybook";

setCustomElementsManifest(manifest);

const preview = {
    parameters: {
        actions: {},
        controls: {
            expanded: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            extractArgTypes: createArgsExtractor(manifest),
        },
    },
    render: createLitRenderer({
        wrapSlots: true, // Wraps a non-default slot in `<span slot="name">`
        joinArrays: true, // Converts array to a comma-separated string
    }),
};

export default preview;
