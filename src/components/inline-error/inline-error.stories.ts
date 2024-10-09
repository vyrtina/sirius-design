import type { Meta, StoryObj } from "@storybook/web-components";
import "./inline-error";

const meta: Meta = {
    title: "components/inline-error",
    component: "sd-inline-error",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        message: "error text",
    },
};
