import type { Meta, StoryObj } from "@storybook/web-components";
import "./button-plain";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta = {
    title: "components/button/button-plain",
    component: "button-plain",
    argTypes: {
        disabled: {
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        disabled: false,
        invert: false,
        useIcon: true,
        label: "Button",
        size: "large",
    },
};
