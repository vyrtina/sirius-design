import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./switch";

const meta: Meta = {
    title: "components/switch",
    component: "sd-switch",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const ToggleOn: Story = {
    args: {
        disabled: false,
        checked: true,
        "label-text": "switch",
    },
};
