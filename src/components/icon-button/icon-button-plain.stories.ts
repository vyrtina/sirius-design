import type { Meta, StoryObj } from "@storybook/web-components";
import "./icon-button-plain";

const meta: Meta = {
    title: "components/icon-button/icon-button-plain",
    component: "icon-button-plain",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        invert: {
            type: "boolean",
        },
        size: {
            options: ["small", "medium", "large", "extra-large"],
            control: { type: "select" },
        },
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        disabled: false,
        invert: false,
        size: "medium",
    },
};
