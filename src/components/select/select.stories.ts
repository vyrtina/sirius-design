import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./select";
import "./select-option";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
    title: "components/select",
    component: "sd-select",
    tags: ["autodocs"],
    render: function Render(args) {
        return html`
            <sd-select
                ?multiple=${args["multiple"]}
                placeholder=${ifDefined(args["placeholder"])}
                label=${ifDefined(args["label"])}
                help-text=${ifDefined(args["help-text"])}
                ?hoist=${args["hoist"]}>
                <sd-select-option value="option-1">Option 1</sd-select-option>
                <sd-select-option value="option-2">Option 2</sd-select-option>
                <sd-select-option value="option-3">Option 3</sd-select-option>
                <sd-select-option value="option-4">Option 4</sd-select-option>
                <sd-select-option value="option-5">Option 5</sd-select-option>
                <sd-select-option value="option-6">Option 6</sd-select-option>
            </sd-select>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        placeholder: "--option--",
        label: "label",
        "help-text": "help text",
    },
};
