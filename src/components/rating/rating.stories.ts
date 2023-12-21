import type { Meta, StoryObj } from "@storybook/web-components";
import "./rating";

const meta: Meta = {
    title: "components/rating",
    component: "sd-rating",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        checked: {
            type: "boolean",
        },
        label: {
            type: "string",
        },
        size: {
            options: ["small", "default"],
            control: "select",
        },
        icon: {
            type: "string",
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        disabled: false,
        checked: true,
        label: "checkbox",
        size: "default",
        icon: "star",
    },
};

export const Custom: Story = {
    args: {
        disabled: false,
        checked: false,
        label: "checkbox",
        size: "small",
        icon: "bolt",
    },
};
