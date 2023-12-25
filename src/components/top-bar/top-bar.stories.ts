import type { Meta, StoryObj } from "@storybook/web-components";
import "./top-bar";

const meta: Meta = {
    title: "components/top-bar",
    component: "sd-top-bar",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        invert: {
            type: "boolean",
        },
        primary: {
            type: "boolean",
        },
        label: {
            type: "string",
        },
        href: {
            type: "string",
        },
        download: {
            type: "string",
        },
        size: {
            options: ["small", "medium", "large", "extra-large"],
            control: { type: "select" },
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        disabled: false,
        invert: false,
        primary: false,
        label: "Button",
        href: "",
        download: "",
        size: "large",
    },
};
