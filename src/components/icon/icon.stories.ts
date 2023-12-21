import type { Meta, StoryObj } from "@storybook/web-components";
import "./icon";

const meta: Meta = {
    title: "components/icon",
    component: "sd-icon",
    argTypes: {
        icon: {
            type: "string",
        },
        shape: {
            options: ["outlined", "rounded", "sharp"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large", "extra-large"],
            control: { type: "select" },
        },
    },
};

export default meta;
type Story = StoryObj;

export const Icon: Story = {
    args: {
        icon: "edit",
        shape: "outlined",
        size: "medium",
    },
};
