import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./text-input";
import "../../icons/src/agriculture";
import "../../icons/src/photo_camera";
import { error } from "console";

const meta: Meta = {
    title: "components/text-input",
    component: "sd-text-input",
    tags: ["autodocs"],
    args: {
        label: "label",
        placeholder: "placeholder",
        type: "text",
        "help-text": "this is a help text",
        clearable: true,
    },
};

export default meta;
type Story = StoryObj;

export const Text: Story = {};

export const WithIcons: Story = {
    render: ({ label, placeholder, type, clearable }) => html`
        <sd-text-input
            label=${label}
            placeholder=${placeholder}
            type=${type}
            ?clearable=${clearable}>
            <sd-icon-agriculture slot="icon"></sd-icon-agriculture>
            <sd-icon-photo-camera slot="trailing-icon"></sd-icon-photo-camera>
        </sd-text-input>
    `,
};

export const Password: Story = {
    args: {
        type: "password",
        passwordToggle: true,
    },
};

export const Invalid: Story = {
    args: {
        value: "as68ka",
        error: true,
        "error-text": "string must only contains caracters",
        required: true,
    },
};
