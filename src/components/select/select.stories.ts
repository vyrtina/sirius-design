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
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
                <sd-option value="option-3">Option 3</sd-option>
                <sd-option value="option-4">Option 4</sd-option>
                <sd-option value="option-5">Option 5</sd-option>
                <sd-option value="option-6">Option 6</sd-option>
            </sd-select>
            <button onclick="printValue()">Select value</button>
            <script>
                function printValue() {
                    const select = document.querySelector("sd-select");
                    console.log("value is: %s", select.value);
                    console.log(select.value);
                }
            </script>
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
        multiple: true
    },
};
