import type { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox";

const meta: Meta = {
    title: "components/checkbox",
    component: "sd-checkbox",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        checked: {
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

export const Checked: Story = {
    args: {
        disabled: false,
        checked: true,
        size: "large",
    },
};

export const Unchecked: Story = {
    args: {
        disabled: false,
        checked: false,
        size: "large",
    },
};
