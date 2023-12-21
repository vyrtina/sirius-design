import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./switch";

const meta: Meta = {
    title: "components/switch",
    component: "sd-switch",
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
        <sd-switch ?checked=${checked} ?disabled=${disabled}>
            <p slot="label">${label}</p>
        </sd-switch>
    `,
};

export default meta;
type Story = StoryObj;

export const ToggleOn: Story = {
    args: {
        disabled: false,
        checked: true,
        label: "switch",
    },
};

export const ToggleOff: Story = {
    args: {
        disabled: false,
        checked: false,
        label: "switch",
    },
};
