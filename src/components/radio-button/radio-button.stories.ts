import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./radio-button";

const meta: Meta = {
    title: "components/radio-button",
    component: "sd-radio-button",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        checked: {
            type: "boolean",
        },
        name: {
            type: "string",
        },
        value: {
            type: "string",
        },
        label: {
            type: "string",
        },
    },
    render: ({ label, disabled, checked }) => html`
        <sd-radio-button ?checked=${checked} ?disabled=${disabled}>
            <a slot="label">${label}</a>
        </sd-radio-button>
    `,
};

export default meta;
type Story = StoryObj;

export const Checked: Story = {
    args: {
        disabled: false,
        checked: true,
        name: "radio",
        value: "1",
        label: "radio",
    },
};

export const Unchecked: Story = {
    args: {
        disabled: false,
        checked: false,
        name: "radio",
        value: "1",
        label: "radio",
    },
};
