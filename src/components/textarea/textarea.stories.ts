import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./textarea";

const meta: Meta = {
    title: "components/textarea",
    component: "sd-textarea",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        label: "label",
        required: true,
    },
};
