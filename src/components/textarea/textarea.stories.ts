import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./textarea";

const meta: Meta = {
    title: "components/textarea",
    component: "sd-textarea",
    tags: ["autodocs"],
    render: (args) => {
        return html` <sd-textarea label=${args["label"]}></sd-textarea> `;
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        label: "label",
    },
};
