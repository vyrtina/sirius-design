import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./select-option";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
    title: "components/select-option",
    component: "sd-select-option",
    tags: ["autodocs"],
    render: function Render(args) {
        return html`
            <sd-select-option
                ?disabled=${args["disabled"]}
                value=${ifDefined(args["value"])}
                >Option 1</sd-select-option
            >
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};
