import type { Meta, StoryObj } from "@storybook/web-components";
import "./text-input";

const meta: Meta = {
    title: "components/text-input",
    component: "sd-text-input",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        required: {
            type: "boolean",
        },
        useIcon: {
            type: "boolean",
        },
        icon: {
            type: "string",
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
        useIcon: false,
        icon: "home",
        label: "label",
        placeholder: "placeholder",
        defaultValue: "",
    },
};

export const Invalid: Story = {
    args: {
        disabled: false,
        required: false,
        useIcon: false,
        icon: "home",
        label: "label",
        placeholder: "placeholder",
        defaultValue: "wrong input",
        pattern: "\\d{4,4}",
        textError: "Input should be a 4 digit code",
    },
};
