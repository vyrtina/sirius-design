import type { Meta, StoryObj } from "@storybook/web-components";
import "./text-area";

const meta: Meta = {
    title: "components/text-area",
    component: "sd-text-area",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        required: {
            type: "boolean",
        },
        label: {
            type: "string",
        },
        placeholder: {
            type: "string",
        },
        pattern: {
            type: "string",
        },
        minLength: {
            type: "number",
        },
        maxLength: {
            type: "number",
        },
        textError: {
            type: "string",
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        disabled: false,
        required: false,
        label: "label",
        placeholder: "placeholder",
        defaultValue: "",
    },
};
