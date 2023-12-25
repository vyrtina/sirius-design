import type { Meta, StoryObj } from "@storybook/web-components";
import "./button-outlined";

const meta: Meta = {
    title: "components/button/button-outlined",
    component: "sd-button-outlined",
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
        label: {
            type: "string",
        },
        useIcon: {
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
        useIcon: true,
        label: "Button",
        size: "large",
    },
};
