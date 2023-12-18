import type { Meta, StoryObj } from "@storybook/web-components";
import "./icon-button-outlined";

const meta: Meta = {
    title: "components/icon-button/icon-button-outlined",
    component: "icon-button-outlined",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        primary: {
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
        primary: true,
        invert: false,
        size: "medium",
    },
};
