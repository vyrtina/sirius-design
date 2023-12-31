import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
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
        label: {
            type: "string",
        },
    },
    render: ({ label, disabled, checked }) => html`
        <sd-checkbox ?checked=${checked} ?disabled=${disabled}>
            <p slot="label">${label}</p>
        </sd-checkbox>
    `,
};

export default meta;
type Story = StoryObj;

export const Checked: Story = {
    args: {
        disabled: false,
        checked: true,
        label: "checkbox",
    },
};

export const Unchecked: Story = {
    args: {
        disabled: false,
        checked: false,
        label: "checkbox",
    },
};
