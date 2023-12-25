import type { Meta, StoryObj } from "@storybook/web-components";
import "./card";

const meta: Meta = {
    title: "components/card",
    component: "sd-card",
    argTypes: {
        disabled: {
            type: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        disabled: false,
    },
};
