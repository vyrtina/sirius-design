import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./tag";

const meta: Meta = {
    title: "components/tag",
    component: "sd-tag",
    tags: ["autodocs"],
    render: (args) => {
        return html`
            <sd-tag variant="primary" ?clearable=${args["clearable"]}>Primary</sd-tag>
            <sd-tag variant="success" ?clearable=${args["clearable"]}>Success</sd-tag>
            <sd-tag variant="neutral" ?clearable=${args["clearable"]}>Neutral</sd-tag>
            <sd-tag variant="warning" ?clearable=${args["clearable"]}>Warning</sd-tag>
            <sd-tag variant="critical" ?clearable=${args["clearable"]}>Critical</sd-tag>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        clearable: true
    }
};
